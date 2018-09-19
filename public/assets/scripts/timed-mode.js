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
  // declare page elements
  const gameContainer = document.getElementById("game");
  const scoreDisplay = document.querySelector("#score > h1");

  // clear the game screen
  killChildren(gameContainer);

  // instantiate score objects
  const currentScore = score(); //eslint-disable-line no-undef
  const playerScore = score();

  // render drums
  addDrums(gameContainer);

  // reset button
  document.getElementById("reset").addEventListener("click", () => {
    scoreDisplay.textContent = currentScore.reset();
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
  submitButton.addEventListener("click", () => {
    // TODO - fix score, it attaches the scores AT THE TIME THE EVENT LISTENER IS MADE
    // WHAT IT NEEDS: to do them with the score as they ARE when submit is pressed
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
    scoreDisplay.textContent = currentScore.reset();
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

const addDrums = gameContainer => {
  const drums = [
    {
      src: "/assets/svg/frog.svg",
      alt: "Frög, value 1000",
      value: 1000
    },
    {
      src: "assets/svg/cyclopig.svg",
      alt: "Cyclopig, value 100",
      value: 100
    },
    {
      src: "assets/svg/burger.svg",
      alt: "Burger, value 10",
      value: 10
    },
    {
      src: "assets/svg/ninja.svg",
      alt: "Frög, value 1000",
      value: 1
    }
  ];

  drums.forEach(d => {
    const drumPicture = document.createElement("img");
    drumPicture.src = d.src;
    drumPicture.alt = d.alt;
    drumPicture.classList.add("drum");
    drumPicture.id = `drum${d.value}`;
    drumPicture.addEventListener("click", e => {
      e.preventDefault();
      hitDrum(d.value, drumPicture.id);
    });
    gameContainer.appendChild(drumPicture);
  });
};

if (typeof module !== "undefined") {
  module.exports = { generateNumber, evalScore, checkNumber };
}
