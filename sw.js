const CACHE_NAME = "smart-campus-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./report-lost.html",
    "./report-found.html",
    "./search.html",
    "./item-details.html",
    "./about.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./images/logo.png",
    "./images/hero-image.jpg",
    "./images/icon-192.png",
    "./images/icon-512.png",
    "./images/apple-icon.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});