// disable scrolling
bodyScrollLock.disableBodyScroll();

// launch games
document.querySelector("#timed").addEventListener("click", () => timedMode());
document
  .querySelector("#twoPlayer")
  .addEventListener("click", () => alert("Coming Soon!"));

// register service worker
if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker.register("/service-worker.js");
}
