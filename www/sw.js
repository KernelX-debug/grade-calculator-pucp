const CACHE_PREFIX = "notas-pucp-app-";
const CACHE_NAME = `${CACHE_PREFIX}1.2.0-ui2`;
const ASSETS = ["./", "./index.html", "./styles.css", "./app.js", "./grade-engine.js", "./catalog.js", "./state-store.js", "./manifest.webmanifest", "./assets/pucplogodeportes.png", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/fonts/outfit-latin.woff2", "./assets/fonts/jetbrains-mono-latin.woff2"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.open(CACHE_NAME).then(async (cache) => {
    const cached = await cache.match(event.request, { ignoreSearch: true });
    if (cached) return cached;
    try { return await fetch(event.request); }
    catch (error) { if (event.request.mode === "navigate") return cache.match("./index.html"); throw error; }
  }));
});
