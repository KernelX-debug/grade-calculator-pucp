const fs = require("node:fs");
const path = require("node:path");
const engine = require("../www/grade-engine.js");
const snapshot = require("../data/courses.json");
const publications = require("../data/additional-courses.json");

const aliases = { LABQUI: "labqui1", TP: "tecpro" };
const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function convert(source) {
  const [abbreviation, ...rest] = source.nombre.split(" - ");
  const id = source.publicationId ? `np-${source.publicationId}` : aliases[abbreviation] || abbreviation.toLowerCase();
  const components = [];
  for (const [index, evaluation] of source.eva.entries()) {
    const label = evaluation.nombre.replace(/Exámenen/g, "Examen").replace(/Exámen\b/g, "Examen").replace(/Practicas/g, "Prácticas");
    const key = normalize(label);
    let componentId = key.includes("calificadas") ? "pc" : key.includes("dirigidas") ? "pd"
      : key.includes("examen") ? (evaluation.total > 1 ? "ex" : key.includes("2") ? "ex2" : "ex1")
      : key.includes("laboratorio") ? "lab" : key.includes("trabajo final") ? "tf"
      : key.includes("permanente") ? "ep" : key.includes("informe") ? "inf"
      : key.includes("avance") ? "a" : key.includes("debate") ? "deb"
      : key.includes("lectura") ? "cl" : key.includes("participacion") ? "par"
      : id.startsWith("lab") ? "lab" : id === "coac" ? "pc" : "pr";
    if (source.publicationId) componentId = `e${index + 1}`;
    const make = (suffix, labelOverride) => ({
      id: suffix || componentId, label: labelOverride || label,
      shortLabel: source.publicationId ? label.match(/\(([^)]+)\)/)?.[1] || `E${index + 1}` : (suffix || componentId).toUpperCase(),
      total: suffix ? 1 : evaluation.total,
      keep: suffix ? 1 : evaluation.total - evaluation.eliminable,
      aggregation: evaluation.sePromedia ? "average" : "sum",
      precision: evaluation.sePromedia ? evaluation.aprox ?? source.aprox ?? 1 : null,
      weight: evaluation.peso,
      note: componentId === "pr" && /^fa[123]$/.test(id) ? "Cada práctica es la suma de PC + PD, sobre 20." : ""
    });
    if (componentId === "a" && evaluation.total === 2 && !evaluation.sePromedia) {
      components.push(make("a1", "Primer avance"), make("a2", "Segundo avance"));
    } else components.push(make());
  }
  const course = {
    id, code: id === "labqui1" ? "LABQUI1" : id === "tecpro" ? "TECPRO" : rest.length ? abbreviation : source.clave === "000000" ? "SIN CÓDIGO" : source.clave,
    aliases: rest.length ? [abbreviation] : [], name: rest.length ? rest.join(" - ") : source.nombre,
    universityCode: source.clave,
    faculty: source.facultad, credits: source.creditos,
    publicationId: source.publicationId || null,
    summary: `${source.facultad === "EEGGCC" ? "Estudios Generales Ciencias" : source.facultad}. Verifica las reglas con tu sílabo.`,
    passGrade: source.notaAprobar ?? 11, finalPrecision: source.redondeoFinal ?? source.aprox ?? 1, finalMode: "round",
    divisor: components.reduce((sum, c) => sum + c.weight * (c.aggregation === "sum" ? c.keep : 1), 0),
    components
  };
  const errors = engine.validateCourse(course);
  if (errors.length) throw new Error(`${source.nombre}: ${errors.join(" ")}`);
  return course;
}

const courses = [...snapshot.courses, ...publications.courses].map(convert);
if (new Set(courses.map((c) => c.id)).size !== courses.length) throw new Error("Hay cursos con identificadores repetidos.");
if (new Set(courses.map((c) => normalize(c.name))).size !== courses.length) throw new Error("Hay nombres de cursos repetidos.");
const payload = { courses };
const output = `(function (root) {\n  const catalog = ${JSON.stringify(payload, null, 2)};\n  if (typeof module === "object" && module.exports) module.exports = catalog;\n  else root.CourseCatalog = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n`;
fs.writeFileSync(path.join(__dirname, "../www/catalog.js"), output);
console.log(`Catálogo generado: ${courses.length} cursos.`);
