// configuration
const version = "1.0.0",
  CACHE = version + "::PWAsite",
  offlineURL = "/offline/",
  installFilesEssential = [
    "/",
    "/index.html",
    "/manifest.json",
    "assets/css/style.css",
    "assets/scripts/bodyScrollLock.js",
    "assets/scripts/dom.js",
    "assets/scripts/logic.js",
    "assets/scripts/score.js",
    "assets/scripts/timed-mode.js",
    "assets/sounds/drums/bongo.wav",
    "assets/sounds/drums/hihat.wav",
    "assets/sounds/drums/kick.wav",
    "assets/sounds/drums/snare.wav",
    "assets/svg/arrow_back.svg",
    "assets/svg/arrow_reset.svg",
    "assets/svg/burger.svg",
    "assets/svg/cyclopig.svg",
    "assets/svg/frog.svg",
    "assets/svg/group.svg",
    "assets/svg/ninja.svg",
    "assets/svg/rockwell_face.svg"
  ].concat(offlineURL),
  installFilesDesirable = ["assets/svg/chelley.svg"];

// install static assets
const installStaticFiles = () => {
  return caches.open(CACHE).then(cache => {
    // cache desirable files
    cache.addAll(installFilesDesirable);

    // cache essential files
    return cache.addAll(installFilesEssential);
  });
};

// application installation
self.addEventListener("install", event => {
  console.log("service worker: install");

  // cache core files
  event.waitUntil(installStaticFiles().then(() => self.skipWaiting()));
});

// clear old caches
function clearOldCaches() {
  return caches.keys().then(keylist => {
    return Promise.all(
      keylist.filter(key => key !== CACHE).map(key => caches.delete(key))
    );
  });
}

// on activation of application, clear old caches
self.addEventListener("activate", event => {
  console.log("service worker: activate");

  // delete old caches
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

// set up application to fetch cached files offline
self.addEventListener("fetch", event => {
  // abandon non-GET requests
  if (event.request.method !== "GET") return;

  const url = event.request.url;

  event.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          // return cached file
          console.log("cache fetch: " + url);
          return response;
        }

        // make network request
        return (
          fetch(event.request)
            .then(newreq => {
              console.log("network fetch: " + url);
              if (newreq.ok) cache.put(event.request, newreq.clone());
              return newreq;
            })
            // app is offline
            .catch(() => offlineAsset(url))
        );
      });
    })
  );
});
