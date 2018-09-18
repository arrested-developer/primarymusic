const timedMode = () => {
  // load rules page: loadRules()
  // load gameplay page: loadGame()
  // start 60 sec timer
  // set player score to 0
  // loop until timer end:
  // generateNumber()
  // display number
  // normal gameplay
  // on 'Submit' checkNumber()
  // if correct, add 1 to total score
};

const loadRules = () => {
  const gameContainer = document.getElementById("game");
  killChildren(gameContainer);
  // DISPLAY DOG
  const dogDisplay = document.createElement("img");
  dogDisplay.src = "/assets/svg/rockwell_face_1.svg";
  dogDisplay.alt = "Rockwell";
  gameContainer.appendChild(dogDisplay);
  // display header
  const rulesHeader = document.createElement("h1");
  rulesHeader.textContent = "Timed Numdrum";
  gameContainer.appendChild(rulesHeader);
  // display rules
  const rulesText = document.createElement("h2");
  rulesText.textContent =
    "Hit the drums to make as many numbers as you can in 1 minute";
  gameContainer.appendChild(rulesText);
  // display start button

  // on press 'Go', return
};

const loadGame = () => {
  // display game
};

const evalScore = score => {
  switch (true) {
    case score <= 5:
      return "easy";
    case score <= 10:
      return "medium";
    case score > 10:
      return "hard";
  }
};

const generateNumber = score => {
  const difficulty = evalScore(score);
  switch (difficulty) {
    case "easy":
      return Math.ceil(Math.random() * Math.ceil(99));
    case "medium":
      return Math.ceil(Math.random() * Math.ceil(9999));
    case "hard":
      return (
        Math.ceil(Math.random() * Math.ceil(9)) * 1000 +
        Math.ceil(Math.random() * Math.ceil(99)) +
        Math.ceil(Math.random() * Math.ceil(9))
      );
  }
};

// TODO: move to dom when it works / when consolidating with other group
const killChildren = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const checkNumber = (actual, expected) => actual === expected;

if (typeof module !== "undefined") {
  module.exports = { generateNumber, evalScore, checkNumber };
}
