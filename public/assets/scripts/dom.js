// disable scrolling
bodyScrollLock.disableBodyScroll();

// launch games
document.querySelector("#timed").addEventListener("click", () => timedMode());
document
  .querySelector("#twoPlayer")
  .addEventListener("click", () => alert("Coming Soon!"));
