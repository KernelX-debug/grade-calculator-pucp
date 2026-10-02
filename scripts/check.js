const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const engine = require("../www/grade-engine.js");
const catalog = require("../www/catalog.js");
const webRoot = path.resolve(__dirname, "../www");
for (const file of ["app.js", "grade-engine.js", "catalog.js", "state-store.js", "sw.js"]) {
  const result = spawnSync(process.execPath, ["--check", path.join(webRoot, file)], { stdio: "inherit" });
  if (result.status !== 0) process.exit(1);
}
for (const course of catalog.courses) {
  const errors = engine.validateCourse(course);
  if (errors.length) throw new Error(`${course.id}: ${errors.join(" ")}`);
}
const index = fs.readFileSync(path.join(webRoot, "index.html"), "utf8");
for (const [, asset] of index.matchAll(/(?:src|href)="\.\/([^"#]+)"/g)) {
  if (!fs.existsSync(path.join(webRoot, asset))) throw new Error(`Falta el recurso ${asset}`);
}
const sw = fs.readFileSync(path.join(webRoot, "sw.js"), "utf8");
for (const [, asset] of sw.matchAll(/"\.\/([^"#]+)"/g)) {
  if (!fs.existsSync(path.join(webRoot, asset))) throw new Error(`Falta el recurso offline ${asset}`);
}
for (const file of ["index.html", "app.js", "catalog.js"]) {
  if (/notaspuke/i.test(fs.readFileSync(path.join(webRoot, file), "utf8"))) throw new Error("La interfaz no debe mencionar ni enlazar el sitio de referencia.");
}
const manifest = JSON.parse(fs.readFileSync(path.join(webRoot, "manifest.webmanifest")));
for (const icon of manifest.icons) if (!fs.existsSync(path.join(webRoot, icon.src))) throw new Error(`Falta ${icon.src}`);
console.log(`Verificado: ${catalog.courses.length} cursos, JavaScript y recursos web/offline.`);
