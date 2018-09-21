/* eslint no-use-before-define: 0 */

const timedMode = () => {
  playerScore.reset();
  loadRules();
};

const gameContainer = document.getElementById("game");
gameContainer.classList.add("flexy");
const headerContainer = document.querySelector("header");
const currentScore = score(); //eslint-disable-line no-undef
const playerScore = score(); //eslint-disable-line no-undef
const currentTarget = target(); //eslint-disable-line no-undef

const buildHeader = () => {
  killChildren(headerContainer);
  const rowOne = document.createElement("div");
  rowOne.classList.add("header-row");
  const backButton = createBackButton();
  const resetButton = createResetButton();
  const drumTotal = createScore();
  const rowOneElements = [backButton, drumTotal, resetButton];
  rowOneElements.forEach(element => {
    rowOne.appendChild(element);
  });
  const rowTwo = document.createElement("div");
  rowTwo.classList.add("header-row", "header-row--2");
  const targetNumber = createTarget(currentTarget.set(0));
  const submitButton = createSubmitButton();
  const rockwell = createRockwell();
  const rowTwoElements = [rockwell, targetNumber, submitButton];
  rowTwoElements.forEach(element => {
    rowTwo.appendChild(element);
  });
  backButton.addEventListener("click", () => {
    document.location.href = "/numdrum";
  });
  const scoreDisplay = drumTotal.firstChild;
  resetButton.addEventListener("click", () => {
    scoreDisplay.textContent = currentScore.reset();
  });
  submitButton.addEventListener("click", () => {
    if (checkNumber(currentScore.get(), currentTarget.get())) {
      const body = document.querySelector("#container");
      playerScore.add(1);
      body.classList.add("animate-background");
      setTimeout(() => body.classList.remove("animate-background"), 2000);
    } else {
      const body = document.querySelector("#game");
      body.classList.add("shake-element");
      setTimeout(() => body.classList.remove("shake-element"), 1000);
    }
    scoreDisplay.textContent = currentScore.reset();
    currentTarget.set(playerScore.get());
    targetNumber.textContent = currentTarget.get();
  });
  headerContainer.appendChild(rowOne);
  headerContainer.appendChild(rowTwo);
};

const loadRules = () => {
  killChildren(gameContainer);
  killChildren(headerContainer);
  // DISPLAY DOG
  const dogDisplay = document.createElement("img");
  dogDisplay.src = "/assets/svg/rockwell_face.svg";
  dogDisplay.alt = "Rockwell";
  gameContainer.appendChild(dogDisplay);
  // display header
  const rulesHeader = document.createElement("h1");
  rulesHeader.textContent = "Timed Numdrum";
  gameContainer.appendChild(rulesHeader);
  // display rules
  const rulesText = document.createElement("p");
  rulesText.classList.add("paragraph-large");
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
  const scoreDisplay = document.querySelector("#score > h1");
  addDrums(currentScore, scoreDisplay);
  // start 60 sec timer
  startTimer(60, () => endGame(playerScore));
  //setTimeout(() => endGame(playerScore), 60 * 1000);
};

const startTimer = (seconds, cb) => {
  // display timer with total time
  const timer = document.createElement("div");
  timer.classList.add("timer");
  timer.innerText = seconds;
  gameContainer.appendChild(timer);
  // every 1 second...
  const x = setInterval(() => {
    // if remaining time is > 0
    if (seconds > 0) {
      // update the timer to show new time
      timer.innerText = seconds;
      seconds--;
    } else {
      // run the callback
      clearInterval(x);
      return cb();
    }
  }, 1000);
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
  img.classList.add("group");
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
      return Math.ceil(Math.random() * Math.ceil(999));
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

const addDrums = (scoreObject, scoreContainer) => {
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
  scoreNumber.textContent = currentScore.reset();
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

const createTarget = number => {
  const currentNumberDisplay = document.createElement("h2");
  currentNumberDisplay.textContent = number;
  currentNumberDisplay.classList.add("target-number");
  return currentNumberDisplay;
};

const createSubmitButton = () => {
  const submitButton = document.createElement("button");
  submitButton.id = "submit";
  submitButton.textContent = "Submit";
  return submitButton;
};

const createRockwell = () => {
  const rockwell = document.createElement("img");
  rockwell.src = "/assets/svg/rockwell_face.svg";
  rockwell.alt = "Rockwell the dog";
  rockwell.classList.add("header-rockwell");
  return rockwell;
};

if (typeof module !== "undefined") {
  module.exports = { generateNumber, evalScore, checkNumber };
}
