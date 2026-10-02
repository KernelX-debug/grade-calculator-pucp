(function (root, factory) {
  const api = factory(typeof module === "object" && module.exports ? require("./grade-engine.js") : root.GradeEngine);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.StateStore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (engine) {
  "use strict";
  const STORAGE_KEY = "notas-pucp-ciencias-v5";
  const isRecord = (value) => value && typeof value === "object" && !Array.isArray(value);
  function newDraft() {
    return { name: "", code: "", passGrade: "11", rounding: "round", components: [
      { id: "b1", label: "Prácticas calificadas", total: "4", drop: "1", weight: "40", precision: "none" },
      { id: "b2", label: "Examen parcial", total: "1", drop: "0", weight: "30", precision: "none" },
      { id: "b3", label: "Examen final", total: "1", drop: "0", weight: "30", precision: "none" }
    ] };
  }
  function draftToCourse(draft, id) {
    return {
      id, name: String(draft.name || "").trim().slice(0, 100), code: String(draft.code || "").trim().slice(0, 24) || "PERSONAL",
      custom: true, faculty: "Mis cursos", summary: "Fórmula personalizada. Los porcentajes de cada bloque se reparten entre sus notas.",
      divisor: 100, passGrade: engine.number(draft.passGrade), finalPrecision: null, finalMode: draft.rounding,
      components: draft.components.map((c, i) => ({ id: c.id || `b${i + 1}`, label: String(c.label || "").trim().slice(0, 100), shortLabel: `B${i + 1}`,
        total: engine.number(c.total), keep: engine.number(c.total) - engine.number(c.drop), weight: engine.number(c.weight),
        aggregation: "average", precision: c.precision === "none" ? null : engine.number(c.precision) }))
    };
  }
  function courseToDraft(course) {
    return { editingId: course.id, name: course.name, code: course.code, passGrade: String(course.passGrade), rounding: course.finalMode,
      components: course.components.map((c) => ({ id: c.id, label: c.label, total: String(c.total), drop: String(c.total - c.keep), weight: String(c.weight), precision: c.precision == null ? "none" : String(c.precision) })) };
  }
  function sanitizeDraft(raw) {
    if (!isRecord(raw) || !Array.isArray(raw.components) || !raw.components.length || raw.components.length > 100) return newDraft();
    const text = (value, limit = 100) => String(value == null ? "" : value).slice(0, limit);
    return { editingId: /^custom-[\w-]+$/.test(raw.editingId || "") ? raw.editingId : undefined,
      name: text(raw.name), code: text(raw.code, 24), passGrade: text(raw.passGrade, 20),
      rounding: ["round", "truncate", "exact"].includes(raw.rounding) ? raw.rounding : "round",
      components: raw.components.map((c, i) => ({ id: /^b[\w-]+$/.test(c?.id || "") ? c.id : `b${i + 1}`,
        label: text(c?.label), total: text(c?.total, 10), drop: text(c?.drop, 10), weight: text(c?.weight, 20),
        precision: ["none", "0", "1", "2", "3"].includes(c?.precision) ? c.precision : "none" })) };
  }
  function sanitizeState(raw, catalog) {
    const source = isRecord(raw) ? raw : {};
    const customCourses = [];
    for (const course of Array.isArray(source.customCourses) ? source.customCourses.slice(0, 100) : []) {
      if (!course?.custom || !/^custom-[\w-]+$/.test(course.id || "") || !Array.isArray(course.components) || course.components.length > 100) continue;
      if (engine.validateCourse(course).length || !course.name || customCourses.some((c) => c.id === course.id)) continue;
      customCourses.push(draftToCourse(courseToDraft(course), course.id));
    }
    const allCourses = catalog.concat(customCourses);
    const values = {};
    if (isRecord(source.values)) for (const course of allCourses) {
      const saved = source.values[course.id];
      if (!isRecord(saved)) continue;
      values[course.id] = {};
      for (const component of course.components) if (typeof saved[component.id] === "string") values[course.id][component.id] = saved[component.id].slice(0, 4000);
    }
    return { schemaVersion: 2,
      selectedCourseId: allCourses.some((c) => c.id === source.selectedCourseId) ? source.selectedCourseId : catalog[0].id,
      activeScreen: ["calculator", "custom", "formulas", "settings"].includes(source.activeScreen) ? source.activeScreen : "calculator",
      theme: source.theme === "dark" ? "dark" : "light", target: String(source.target ?? "11").slice(0, 20),
      courseQuery: String(source.courseQuery || "").slice(0, 100), faculty: String(source.faculty || "").slice(0, 100),
      values, customCourses, draft: sanitizeDraft(source.draft) };
  }
  function load(storage, catalog) {
    try { return { state: sanitizeState(JSON.parse(storage.getItem(STORAGE_KEY) || "{}"), catalog), error: "" }; }
    catch { return { state: sanitizeState({}, catalog), error: "No se pudieron leer los datos guardados. Puedes continuar y descargar una copia de esta sesión." }; }
  }
  function save(storage, state) {
    try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
    catch { return false; }
  }
  function validateBackup(raw, catalog) {
    if (!isRecord(raw) || raw.app !== "notas-pucp-ciencias" || raw.version !== 1 || !isRecord(raw.state)) throw new Error("Selecciona una copia de seguridad de Notas PUCP.");
    const state = sanitizeState(raw.state, catalog);
    if (!Array.isArray(raw.state.customCourses) || raw.state.customCourses.length !== state.customCourses.length) throw new Error("La copia contiene cursos con porcentajes o reglas inválidas.");
    return state;
  }
  return { STORAGE_KEY, newDraft, draftToCourse, courseToDraft, sanitizeState, sanitizeDraft, load, save, validateBackup };
});
