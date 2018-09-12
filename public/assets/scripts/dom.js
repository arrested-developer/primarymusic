/* eslint-disable */

var scoreDisplay = document.getElementById("score");
var drum1 = document.getElementById("drum1");
var drum10 = document.getElementById("drum10");
var drum100 = document.getElementById("drum100");
var drum1000 = document.getElementById("drum1000");

var currentScore = score();

function hitDrum(num) {
  currentScore.add(num);
  scoreDisplay.textContent = currentScore.get();
  // playsound
}

drum1.addEventListener("click", function() {
  hitDrum(1);
});

drum10.addEventListener("click", function() {
  hitDrum(10);
});

drum100.addEventListener("click", function() {
  hitDrum(100);
});

drum1000.addEventListener("click", function() {
  hitDrum(1000);
});
