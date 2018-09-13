/* eslint-disable */

var scoreDisplay = document.getElementById("score");
var drums = document.querySelectorAll(".drum");

var currentScore = score();

function hitDrum(num, drum) {
  currentScore.add(num);
  scoreDisplay.textContent = currentScore.get();
  playSound(drum);
}

drums.forEach(function(drum) {
  var drumId = drum.id;
  var drumScore = Number(drum.id.slice(4));
  drum.addEventListener("click", function() {
    hitDrum(drumScore, drumId);
  });
});
