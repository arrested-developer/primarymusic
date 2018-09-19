//This is the "Offline page" service worker

//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", (event) => {
  const offlinePage = new Request("offline.html");
  event.waitUntil(
    fetch(offlinePage).then((response) => caches.open("pwabuilder-offline").then((cache) => {
        console.log(
          "[PWA Builder] Cached offline page during Install" + response.url
        );
        return cache.put(offlinePage, response);
      }))
  );
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch((error) => {
      console.error(
        "[PWA Builder] Network request Failed. Serving offline page " + error
      );
      return caches.open("pwabuilder-offline").then((cache) => cache.match("offline.html"));
    })
  );
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener("refreshOffline", (response) => caches.open("pwabuilder-offline").then((cache) => {
    console.log(
      "[PWA Builder] Offline page updated from refreshOffline event: " +
        response.url
    );
    return cache.put(offlinePage, response);
  }));
