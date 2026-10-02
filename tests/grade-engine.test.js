const test = require("node:test");
const assert = require("node:assert/strict");
const engine = require("../www/grade-engine.js");
const store = require("../www/state-store.js");
const { courses } = require("../www/catalog.js");
const base = require("../data/courses.json").courses;
const publications = require("../data/additional-courses.json").courses;
const get = (id) => courses.find((course) => course.id === id);
const personal = () => store.draftToCourse({ ...store.newDraft(), name: "Mi curso" }, "custom-test");

function decimalTruncate(value, precision) {
  const text = value.toFixed(10);
  const [whole, fractional] = text.split(".");
  return Number(precision === 0 ? whole : `${whole}.${fractional.slice(0, precision)}`);
}
function sourceResult(source, lists) {
  let numerator = 0;
  let divisor = 0;
  for (const [i, evaluation] of source.eva.entries()) {
    const keep = evaluation.total - evaluation.eliminable;
    const chosen = lists[i].concat(Array(evaluation.total).fill(0)).sort((a, b) => b - a).slice(0, keep);
    const sum = chosen.reduce((a, b) => a + b, 0);
    numerator += (evaluation.sePromedia ? decimalTruncate(sum / keep, evaluation.aprox ?? source.aprox ?? 1) : sum) * evaluation.peso;
    divisor += evaluation.peso * (evaluation.sePromedia ? 1 : keep);
  }
  const exact = numerator / divisor;
  const beforeFinal = decimalTruncate(exact, source.redondeoFinal ?? source.aprox ?? 1);
  return { exact, beforeFinal, official: Math.round(beforeFinal) };
}

test("el catálogo incluye los 24 cursos previos y los 11 esquemas adicionales, sin enlaces externos", () => {
  assert.equal(courses.length, 35);
  assert.equal(new Set(courses.map((c) => c.id)).size, 35);
  assert.equal(get("np-21"), undefined);
  for (const course of courses) {
    assert.deepEqual(engine.validateCourse(course), []);
    assert.equal(course.sourceUrl, undefined);
    assert.doesNotMatch(JSON.stringify(course), /notaspuke/i);
    const zeros = Object.fromEntries(course.components.map((c) => [c.id, Array(c.total).fill(0).join(" ")]));
    const twenties = Object.fromEntries(course.components.map((c) => [c.id, Array(c.total).fill(20).join(" ")]));
    assert.equal(engine.computeCourse(course, zeros).official, 0);
    assert.equal(engine.computeCourse(course, twenties).official, 20);
  }
});

test("las 35 fórmulas coinciden con las reglas consultadas en 3.500 escenarios", () => {
  let seed = 419;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed; };
  for (const [index, source] of base.concat(publications).entries()) {
    const course = courses[index];
    for (let trial = 0; trial < 100; trial++) {
      const lists = source.eva.map((evaluation) => Array.from({ length: random() % (evaluation.total + 1) }, () => random() % 21));
      const values = {};
      let position = 0;
      for (const [i, evaluation] of source.eva.entries()) {
        if (course.id === "ta" && evaluation.nombre === "Avances") {
          values.a1 = lists[i][0] == null ? "" : String(lists[i][0]);
          values.a2 = lists[i][1] == null ? "" : String(lists[i][1]);
          position += 2;
        } else values[course.components[position++].id] = lists[i].join(" ");
      }
      const expected = sourceResult(source, lists);
      const actual = engine.computeCourse(course, values);
      assert.ok(actual.valid);
      assert.ok(Math.abs(actual.exact - expected.exact) < 1e-9, `${course.id}: ${JSON.stringify(values)}`);
      assert.equal(actual.beforeFinal, expected.beforeFinal, course.id);
      assert.equal(actual.official, expected.official, course.id);
    }
  }
});

test("Estática toma 6 de 7 prácticas y conserva los pesos 3, 3, 4", () => {
  const course = get("estatica");
  assert.equal(course.components[0].total, 7);
  assert.equal(course.components[0].keep, 6);
  const result = engine.computeCourse(course, { pr: "20 19 18 17 16 15 0", ex1: "11", ex2: "14" });
  assert.equal(result.componentMap.pr.value, 17.5);
  assert.equal(result.exact, 14.15);
  assert.equal(result.beforeFinal, 14.1);
  assert.equal(result.official, 14);
});

test("los exámenes sin promedio conservan sus decimales individuales", () => {
  const result = engine.computeCourse(get("amga"), { pc: "10 10 10 0", pd: "10 10 10 0", ex: "10.8 11.2" });
  assert.equal(result.componentMap.ex.value, 22);
  assert.equal(result.exact, 10.6);
  assert.equal(result.official, 11);
});

test("la entrada decimal es estricta y no convierte negativas o notas >20", () => {
  assert.deepEqual(engine.parseGrades("10,5 20;0", 3).grades, [10.5, 20, 0]);
  for (const raw of ["-1", "21", "abc15", "10..5", "12abc", "10,5,7", "Infinity", "1e1"]) assert.ok(engine.parseGrades(raw, 3).error, raw);
  assert.ok(engine.parseGrades("10 11 12", 2).error);
  assert.equal(engine.parseGrades("", 1).grades.length, 0);
  assert.equal(engine.parseGrades("0", 1).grades.length, 1);
  assert.equal(engine.computeCourse(get("amga"), { pc: "-1" }).valid, false);
});

test("el truncado compensa solo los errores de coma flotante", () => {
  assert.equal(engine.truncate(0.29, 2), 0.29);
  assert.equal(engine.truncate(10.499999, 1), 10.4);
  assert.equal(engine.truncate(10.5, 1), 10.5);
  assert.equal(engine.truncate(11.199999999999998, 1), 11.2);
});

test("los cursos personalizados usan porcentajes, cantidades, descartes y reglas finales", () => {
  const course = personal();
  const values = { b1: "20 10 15 0", b2: "12", b3: "18" };
  assert.equal(engine.computeCourse(course, values).exact, 15);
  for (const [mode, expected] of [["round", 11], ["truncate", 10], ["exact", 10.5]]) {
    const one = { ...course, finalMode: mode, components: [{ ...course.components[0], total: 1, keep: 1, weight: 100 }] };
    assert.equal(engine.computeCourse(one, { b1: "10,5" }).official, expected);
  }
  const fractional = { ...course, components: course.components.map((c, i) => ({ ...c, weight: [33.3, 33.3, 33.4][i] })) };
  assert.deepEqual(engine.validateCourse(fractional), []);
  const invalid = { ...course, components: course.components.map((c) => ({ ...c, weight: 20 })) };
  assert.equal(engine.computeCourse(invalid, {}).valid, false);
  for (const component of [{ ...course.components[0], total: 0 }, { ...course.components[0], total: 2.5 }, { ...course.components[0], keep: 0 }, { ...course.components[0], weight: -1 }, { ...course.components[0], id: 'x"]' }, null]) {
    assert.ok(engine.validateCourse({ ...course, components: [component] }).length);
  }
});

test("las variantes conservan sus reglas distintas", () => {
  assert.notEqual(get("np-18").variantLabel, get("np-133").variantLabel);
  assert.equal(get("np-18").components[2].precision, null);
  assert.equal(get("np-133").components[2].precision, 0);
});

test("la meta contempla descartes, truncados, los límites 0 y 20 y objetivos imposibles", () => {
  const course = get("amga");
  const values = { pc: "17 15 20 9", pd: "15 16 18 7", ex: "11" };
  assert.equal(engine.findMinimumNeeded(course, values, "ex", 11), 1.3);
  const twenty = { ...personal(), components: [{ id: "b1", label: "Examen", shortLabel: "EX", total: 1, keep: 1, weight: 100, aggregation: "average", precision: null }], finalMode: "exact" };
  assert.equal(engine.findMinimumNeeded(twenty, {}, "b1", 20), 20);
  assert.equal(engine.findMinimumNeeded(twenty, {}, "b1", 0), 0);
  assert.equal(engine.findMinimumNeeded(course, { pc: "0 0 0 0", pd: "0 0 0 0", ex: "0" }, "ex", 20), null);
  assert.equal(engine.findMinimumNeeded(course, { ...values, ex: "-1" }, "ex", 11), null);
  const top = get("labfa1");
  const existing = { lab: "20 20 20 20 0" };
  const needed = engine.findMinimumNeeded(top, existing, "lab", 20);
  assert.equal(needed, 17.5);
  assert.equal(engine.computeCourse(top, { lab: `${existing.lab} ${needed}` }).official, 20);
  assert.equal(engine.computeCourse(top, { lab: `${existing.lab} ${needed - 0.1}` }).official, 19);
});
