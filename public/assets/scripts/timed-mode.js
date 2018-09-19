/* eslint no-use-before-define: 0 */

const timedMode = () => {
  loadRules();
};

const gameContainer = document.getElementById("game");
const headerContainer = document.querySelector("header");
const currentScore = score(); //eslint-disable-line no-undef
const playerScore = score(); //eslint-disable-line no-undef

const buildHeader = () => {
  killChildren(headerContainer);
  const backButton = createBackButton();
  const resetButton = createResetButton();
  const drumTotal = createScore();
  const headerElements = [backButton, drumTotal, resetButton];
  headerElements.forEach(element => {
    headerContainer.appendChild(element);
  });

  backButton.addEventListener("click", () => {
    document.location.href = "/";
  });
  const scoreDisplay = drumTotal.firstChild;
  resetButton.addEventListener("click", () => {
    scoreDisplay.textContent = currentScore.reset();
  });

  // add event listeners: submit button
  // TODO - this feels messy
  const scoreBar = document.getElementById("info");
  let currentNumber = generateNumber(0);
  // display number
  const currentNumberDisplay = document.createElement("h2");
  currentNumberDisplay.textContent = currentNumber;
  // display submit button
  const submitButton = document.createElement("button");
  submitButton.id = "submit";
  submitButton.textContent = "Submit";
  /* eslint-disable-next-line */
  scoreBar.appendChild(submitButton);
  scoreBar.appendChild(currentNumberDisplay);
  document.getElementById("submit").addEventListener("click", () => {
    if (
      checkNumber(
        Number(document.querySelector("#score > h1").textContent),
        currentNumber
      )
    ) {
      playerScore.add(1);
    }
    scoreDisplay.textContent = currentScore.reset();
    currentNumber = generateNumber(playerScore.get());
    currentNumberDisplay.textContent = currentNumber;
  });
};

const loadRules = () => {
  killChildren(gameContainer);
  killChildren(headerContainer);
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
  // SETUP THE SCREEN
  killChildren(gameContainer);
  buildHeader();

  // render drums
  addDrums(gameContainer, currentScore, scoreDisplay);

  // start 60 sec timer
  setTimeout(() => endGame(playerScore), 60 * 1000);

  // generate initial number and gameplay loop
};

const endGame = playerScore => {
  messageScreen(
    {
      imgPath: "/assets/svg/group.svg",
      alt: "The Numdrum gang!",
      header: "Game Over!",
      text: `You got ${playerScore.get()} numbers right!`,
      button: "New Game!"
    },
    timedMode
  );
};

const messageScreen = (data, cb) => {
  killChildren(gameContainer);
  killChildren(headerContainer);
  const img = document.createElement("img");
  img.src = data.imgPath;
  img.alt = data.alt;
  gameContainer.appendChild(img);
  const header = document.createElement("h1");
  header.textContent = data.header;
  gameContainer.appendChild(header);
  // display rules
  const scoreMessage = document.createElement("h2");
  scoreMessage.textContent = data.text;
  gameContainer.appendChild(scoreMessage);
  const button = document.createElement("button");
  button.textContent = data.button;
  button.addEventListener("click", event => {
    event.preventDefault();
    cb();
  });
  gameContainer.appendChild(button);
};

const evalScore = score => {
  switch (true) {
    case score <= 3:
      return "easy";
    case score <= 7:
      return "medium";
    case score > 7:
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
function hitDrum(num, drum, scoreObject, scoreContainer) {
  scoreContainer.textContent = scoreObject.add(num);
  playSound(drum); //eslint-disable-line no-undef
  document.getElementById(drum).classList.toggle(drum + "--clicked");
}

const checkNumber = (actual, expected) => actual === expected;

const addDrums = (gameContainer, scoreObject, scoreContainer) => {
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
      hitDrum(d.value, drumPicture.id, scoreObject, scoreContainer);
    });
    gameContainer.appendChild(drumPicture);
  });
};

const createBackButton = () => {
  const backButton = document.createElement("button");
  backButton.id = "back";
  backButton.classList.add("circle-button");
  const backImage = createButtonImage(
    "arrow--back",
    "assets/svg/arrow_back.svg",
    "back arrow"
  );
  backButton.appendChild(backImage);
  return backButton;
};

const createScore = () => {
  const scoreContainer = document.createElement("div");
  scoreContainer.id = "score";
  const scoreNumber = document.createElement("h1");
  scoreNumber.textContent = "0";
  scoreContainer.appendChild(scoreNumber);
  return scoreContainer;
};

const createResetButton = () => {
  const resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.classList.add("circle-button");
  const resetImage = createButtonImage(
    "arrow-reset",
    "assets/svg/arrow_reset.svg",
    "reset icon"
  );
  resetButton.appendChild(resetImage);
  return resetButton;
};

const createButtonImage = (className, source, alt) => {
  const buttonImage = document.createElement("img");
  buttonImage.classList.add(className);
  buttonImage.src = source;
  buttonImage.alt = alt;
  return buttonImage;
};

if (typeof module !== "undefined") {
  module.exports = { generateNumber, evalScore, checkNumber };
}
