(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.GradeEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function number(value) {
    const text = String(value == null ? "" : value).trim().replace(",", ".");
    return /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text) ? Number(text) : NaN;
  }

  function truncate(value, precision) {
    if (precision == null) return value;
    const scale = 10 ** precision;
    const scaled = value * scale;
    return Math.trunc(scaled + Number.EPSILON * Math.max(1, Math.abs(scaled)) * 4) / scale;
  }

  function parseGrades(raw, total) {
    const text = String(raw == null ? "" : raw).trim();
    if (!text) return { grades: [], error: "" };
    const tokens = text.split(/[\s;]+/);
    if (tokens.length > total) return { grades: [], error: `Ingresa como máximo ${total} nota(s).` };
    const grades = tokens.map(number);
    if (grades.some((grade) => !Number.isFinite(grade) || grade < 0 || grade > 20)) {
      return { grades: [], error: "Usa notas entre 0 y 20, separadas por espacios; se aceptan decimales con punto o coma." };
    }
    return { grades, error: "" };
  }

  function validateCourse(course) {
    const errors = [];
    if (!course || !Array.isArray(course.components) || !course.components.length) return ["Añade al menos una evaluación."];
    const ids = new Set();
    for (const component of course.components) {
      if (!component || typeof component !== "object") { errors.push("La evaluación no es válida."); continue; }
      if (typeof component.id !== "string" || !/^[a-zA-Z0-9_-]{1,64}$/.test(component.id) || ["__proto__", "constructor", "prototype"].includes(component.id) || ids.has(component.id)) errors.push("Las evaluaciones deben tener identificadores válidos y distintos.");
      ids.add(component.id);
      if (typeof component.label !== "string" || !component.label.trim()) errors.push("Pon un nombre a cada evaluación.");
      if (!Number.isInteger(component.total) || component.total < 1 || component.total > 100) errors.push("La cantidad debe ser un entero entre 1 y 100.");
      if (!Number.isInteger(component.keep) || component.keep < 1 || component.keep > component.total) errors.push("Los descartes deben dejar al menos una nota.");
      if (!Number.isFinite(component.weight) || component.weight <= 0) errors.push("Cada peso debe ser mayor que cero.");
      if (!["average", "sum"].includes(component.aggregation)) errors.push("La regla de evaluación no es válida.");
      if (component.precision != null && ![0, 1, 2, 3].includes(component.precision)) errors.push("La precisión de evaluación no es válida.");
    }
    if (course.finalPrecision != null && ![0, 1, 2, 3].includes(course.finalPrecision)) errors.push("La precisión final no es válida.");
    if (!["round", "truncate", "exact"].includes(course.finalMode)) errors.push("La regla final no es válida.");
    const divisor = course.components.reduce((sum, c) => sum + (c ? c.weight * (c.aggregation === "sum" ? c.keep : 1) : NaN), 0);
    if (!Number.isFinite(course.divisor) || course.divisor <= 0 || (!course.custom && Math.abs(divisor - course.divisor) > 1e-7)) errors.push("Los pesos no coinciden con el total de la fórmula.");
    if (course.custom && Math.abs(divisor - 100) > 1e-7) errors.push("Los porcentajes deben sumar 100 %.");
    if (!Number.isFinite(course.passGrade) || course.passGrade < 0 || course.passGrade > 20) errors.push("La nota aprobatoria debe estar entre 0 y 20.");
    return [...new Set(errors)];
  }

  function computeComponent(component, raw) {
    const parsed = parseGrades(raw, component.total);
    const completed = parsed.grades.concat(Array(Math.max(0, component.total - parsed.grades.length)).fill(0));
    const ordered = component.keep < component.total ? completed.slice().sort((a, b) => b - a) : completed;
    const used = ordered.slice(0, component.keep);
    const sum = used.reduce((acc, grade) => acc + grade, 0);
    const value = component.aggregation === "sum" ? sum : truncate(sum / component.keep, component.precision);
    return { value, entered: parsed.grades.length, total: component.total, used, dropped: ordered.slice(component.keep), error: parsed.error };
  }

  function computeCourse(course, values = {}) {
    const errors = validateCourse(course);
    const componentMap = {};
    if (errors.length) return { valid: false, errors, componentMap };
    let weighted = 0;
    let entered = 0;
    let total = 0;
    for (const component of course.components) {
      const stat = computeComponent(component, values[component.id]);
      componentMap[component.id] = stat;
      if (stat.error) errors.push(`${component.label}: ${stat.error}`);
      weighted += stat.value * component.weight;
      entered += stat.entered;
      total += stat.total;
    }
    const exact = weighted / course.divisor;
    const beforeFinal = truncate(exact, course.finalPrecision);
    const official = course.finalMode === "round" ? Math.round(beforeFinal)
      : course.finalMode === "truncate" ? Math.trunc(beforeFinal) : beforeFinal;
    return { valid: !errors.length, errors, componentMap, entered, total, complete: entered === total, exact, beforeFinal, official, passed: official >= course.passGrade };
  }

  function findMinimumNeeded(course, values, componentId, target) {
    const result = computeCourse(course, values);
    const component = course.components.find((c) => c.id === componentId);
    if (!result.valid || !component || !Number.isFinite(target) || target < 0 || target > 20) return null;
    const existing = parseGrades(values[componentId], component.total).grades;
    const remaining = component.total - existing.length;
    if (!remaining) return null;
    const succeeds = (tenths) => {
      const trial = { ...values, [componentId]: existing.concat(Array(remaining).fill(tenths / 10)).join(" ") };
      return computeCourse(course, trial).official >= target;
    };
    if (!succeeds(200)) return null;
    let low = 0;
    let high = 200;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (succeeds(mid)) high = mid;
      else low = mid + 1;
    }
    return low / 10;
  }

  function formula(course) {
    const terms = course.components.map((c) => {
      const label = c.shortLabel || c.label;
      const expression = c.aggregation === "sum" && c.keep > 1
        ? `(${Array.from({ length: c.keep }, (_, i) => `${label}${i + 1}`).join(" + ")})` : label;
      return `${c.weight} × ${expression}`;
    });
    return `[${terms.join(" + ")}] / ${course.divisor}`;
  }

  return { number, truncate, parseGrades, validateCourse, computeComponent, computeCourse, findMinimumNeeded, formula };
});
