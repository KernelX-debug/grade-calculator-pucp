const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../www");
const port = Number(process.env.PORT || 4173);
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2" };
http.createServer((request, response) => {
  let file;
  try { file = path.resolve(root, "." + decodeURIComponent(new URL(request.url, "http://localhost").pathname)); }
  catch { response.writeHead(400); response.end(); return; }
  if (!file.startsWith(root + path.sep) && file !== root) { response.writeHead(403); response.end(); return; }
  if (file === root) file = path.join(root, "index.html");
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405); response.end(); return; }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { response.writeHead(404); response.end("No encontrado"); return; }
    response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" });
    if (request.method === "HEAD") response.end();
    else fs.createReadStream(file).pipe(response);
  });
}).listen(port, "127.0.0.1", () => console.log(`Notas PUCP: http://localhost:${port}`));
