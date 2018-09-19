const timedMode = () => {
  loadRules();
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
  const startButton = document.createElement("button");
  startButton.textContent = "Start!";
  startButton.addEventListener("click", event => {
    event.preventDefault();
    loadGame();
  });
  gameContainer.appendChild(startButton);
};

const loadGame = () => {
  const gameContainer = document.getElementById("game");
  killChildren(gameContainer);
  // bring in the drums
  // declare page elements
  const scoreDisplay = document.querySelector("#score > h1");

  // instantiate player score
  const currentScore = score(); //eslint-disable-line no-undef
  const playerScore = score();

  // add drums back in

  let drumPicture = document.createElement("img");
  drumPicture.src = "/assets/svg/frog.svg";
  drumPicture.alt = "Frög, value 1000";
  drumPicture.classList.add("drum");
  drumPicture.id = "drum1000";
  gameContainer.appendChild(drumPicture);

  drumPicture = document.createElement("img");
  drumPicture.src = "assets/svg/cyclopig.svg";
  drumPicture.alt = "Cyclopig, value 100";
  drumPicture.classList.add("drum");
  drumPicture.id = "drum100";
  gameContainer.appendChild(drumPicture);

  drumPicture = document.createElement("img");
  drumPicture.src = "assets/svg/burger.svg";
  drumPicture.alt = "Burger, value 10";
  drumPicture.classList.add("drum");
  drumPicture.id = "drum10";
  gameContainer.appendChild(drumPicture);

  drumPicture = document.createElement("img");
  drumPicture.src = "assets/svg/ninja.svg";
  drumPicture.alt = "Ninja, value 1";
  drumPicture.classList.add("drum");
  drumPicture.id = "drum1";
  gameContainer.appendChild(drumPicture);

  // reset button
  document.getElementById("reset").addEventListener("click", () => {
    scoreDisplay.textContent = currentScore.reset();
  });

  // go through drums (has class .drum) and attach eventListeners to call hitDrum();
  const drums = document.querySelectorAll(".drum");
  drums.forEach(drum => {
    const drumId = drum.id;
    const drumScore = Number(drum.id.slice(4));
    drum.addEventListener("click", e => {
      e.preventDefault();
      hitDrum(drumScore, drumId);
    });
  });

  // start 60 sec timer
  setTimeout(
    () => alert(`Game Over! Your Score was ${playerScore.get()}`),
    60 * 1000
  );

  // loop until timer end:
  // generateNumber()
  const scoreBar = document.getElementById("info");
  let currentNumber = generateNumber(0);
  // display number
  const currentNumberDisplay = document.createElement("h2");
  currentNumberDisplay.textContent = currentNumber;
  // display start button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  /* eslint-disable-next-line */
  submitButton.addEventListener("click", event => {
    // TODO - fix score, it attaches the scores AT THE TIME THE EVENT LISTENER IS MADE
    // WHAT IT NEEDS: to do them with the score as they ARE when submit is pressed
    event.preventDefault();
    if (
      checkNumber(
        Number(document.querySelector("#score > h1").textContent),
        currentNumber
      )
    ) {
      playerScore.add(1);
      currentNumber = generateNumber(playerScore.get());
      currentNumberDisplay.textContent = currentNumber;
    }
  });
  scoreBar.appendChild(submitButton);
  scoreBar.appendChild(currentNumberDisplay);
  // normal gameplay
  // on 'Submit' checkNumber()
  // if correct, add 1 to total score
};

const evalScore = score => {
  switch (true) {
    case score <= 3:
      return "easy";
    case score <= 7:
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

// hitDrum is a wrapper function which calls individual gameplay elements as each drum is hit
function hitDrum(num, drum) {
  scoreDisplay.textContent = currentScore.add(num);
  playSound(drum); //eslint-disable-line no-undef
  document.getElementById(drum).classList.toggle(drum + "--clicked");
}

const checkNumber = (actual, expected) => actual === expected;

if (typeof module !== "undefined") {
  module.exports = { generateNumber, evalScore, checkNumber };
}
