/* eslint-disable */

var scoreDisplay = document.getElementById("score");
var drums = document.querySelectorAll(".drum");

var currentScore = score();

function hitDrum(num, drum) {
  currentScore.add(num);
  var s = document.createElement("h1");
  var o = scoreDisplay.querySelector("h1");
  s.textContent = currentScore.get();
  scoreDisplay.replaceChild(s, o);
  playSound(drum);
}

drums.forEach(function(drum) {
  var drumId = drum.id;
  var drumScore = Number(drum.id.slice(4));
  drum.addEventListener("click", function() {
    hitDrum(drumScore, drumId);
  });
});
