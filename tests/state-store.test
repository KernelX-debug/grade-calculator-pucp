const test = require("node:test");
const assert = require("node:assert/strict");
const store = require("../www/state-store.js");
const { courses } = require("../www/catalog.js");

test("se conservan notas de la versión anterior, incluido TA y Estática", () => {
  const saved = { selectedCourseId: "ta", theme: "dark", target: "14", values: {
    ta: { inf: "12", a1: "14", a2: "17", ex: "12 18", tf: "16", ep: "11" },
    estatica: { pr: "20 19 18 17 16 15 14 13" }, amga: { pc: "10 11 12", unknown: "5" }
  } };
  const state = store.sanitizeState(saved, courses);
  assert.equal(state.selectedCourseId, "ta");
  assert.equal(state.theme, "dark");
  assert.deepEqual(state.values.ta, saved.values.ta);
  assert.equal(state.values.estatica.pr, saved.values.estatica.pr);
  assert.equal(state.values.amga.unknown, undefined);
  assert.equal(state.schemaVersion, 2);
  const retired = store.sanitizeState({ selectedCourseId: "np-21", values: { "np-21": { e1: "14" }, amga: { pc: "12 15 16" } } }, courses);
  assert.equal(retired.selectedCourseId, "amga");
  assert.equal(retired.values.amga.pc, "12 15 16");
});

test("el almacenamiento bloqueado o corrupto no impide usar la app", () => {
  const blocked = { getItem() { throw new Error("Blocked"); }, setItem() { throw new Error("Full"); } };
  const loaded = store.load(blocked, courses);
  assert.equal(loaded.state.selectedCourseId, "amga");
  assert.ok(loaded.error);
  assert.equal(store.save(blocked, loaded.state), false);
  assert.ok(store.load({ getItem: () => "broken-json" }, courses).error);
  assert.equal(store.sanitizeState({ selectedCourseId: "missing", activeScreen: "missing", values: [] }, courses).activeScreen, "calculator");
});

test("un respaldo restaura cursos personalizados, su borrador y notas", () => {
  const course = store.draftToCourse({ ...store.newDraft(), name: "Mi <curso>", code: "XXX" }, "custom-example");
  const state = store.sanitizeState({ customCourses: [course], selectedCourseId: course.id, values: { [course.id]: { b1: "15 16 17 0" } }, draft: store.courseToDraft(course) }, courses);
  const restored = store.validateBackup(JSON.parse(JSON.stringify({ app: "notas-pucp-ciencias", version: 1, state })), courses);
  assert.equal(restored.customCourses[0].name, "Mi <curso>");
  assert.equal(restored.selectedCourseId, course.id);
  assert.equal(restored.draft.editingId, course.id);
  assert.equal(restored.values[course.id].b1, "15 16 17 0");
});

test("los respaldos incorrectos se rechazan antes de reemplazar datos", () => {
  assert.throws(() => store.validateBackup({ unrelated: true }, courses));
  const course = store.draftToCourse({ ...store.newDraft(), name: "Curso" }, "custom-example");
  course.components[0].weight = 20;
  assert.throws(() => store.validateBackup({ app: "notas-pucp-ciencias", version: 1, state: { customCourses: [course] } }, courses), /inválidas/);
  assert.throws(() => store.validateBackup({ app: "notas-pucp-ciencias", version: 1, state: { customCourses: "unexpected" } }, courses));
});
