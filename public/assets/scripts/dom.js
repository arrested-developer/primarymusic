/* eslint-disable */

// declare page elements
var scoreDisplay = document.getElementById("score");
var drums = document.querySelectorAll(".drum");

// instantiate player score
var currentScore = score();

// reset button
document.getElementById("reset").addEventListener("click", function() {
  document.querySelector("#score > h1").textContent = currentScore.reset();
});

// hitDrum is a wrapper function which calls individual gameplay elements as each drum is hit
function hitDrum(num, drum) {
  document.querySelector("#score > h1").textContent = currentScore.add(num);
  playSound(drum);
  document.getElementById(drum).classList.toggle(drum + "--clicked");
}

// go through drums (has class .drum) and attach eventListeners to call hitDrum();
drums.forEach(function(drum) {
  var drumId = drum.id;
  var drumScore = Number(drum.id.slice(4));
  drum.addEventListener("touchend", function(e) {
    e.preventDefault();
    hitDrum(drumScore, drumId);
  });
});

// disable scrolling on page
// document.ontouchmove = function(e) {
//   e.preventDefault();
// };

// window.addEventListener("scroll", function(e) {
//   e.preventDefault();
// });
bodyScrollLock.disableBodyScroll();
