const CACHE_NAME = "lostfound-v1";

const urlsToCache = [

    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/search.html",
    "/report-lost.html",
    "/report-found.html",
    "/about.html"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))

    );

});