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
  // display rules
  // on press 'Go', return
};

const loadGame = () => {
  // display game
};

const generateNumber = () => {
  // diffculty = evalScore()
  // switch difficulty:
  // generates appropriate random number
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

const checkNumber = (actual, expected) => actual === expected;

if (typeof module !== "undefined") {
  module.exports = { generateNumber, evalScore, checkNumber };
}
