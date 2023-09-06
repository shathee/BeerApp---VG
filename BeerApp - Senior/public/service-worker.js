this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache-name").then((cache) => {
      return cache.addAll([
        "/index.html",
        "/static/js/bundle.js",
        "/static/css/main.css",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
