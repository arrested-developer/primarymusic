/* eslint no-use-before-define: 0 */

const screen = document.getElementById("container");
const gameContainer = document.getElementById("game");
const headerContainer = document.querySelector("header");

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

const timedMode = () => {
  killChildren([gameContainer, headerContainer]);
  const startButton = createStartButton();
  const ruleElements = [
    createRockwell(false),
    createRulesTitle("Timed Numdrum"),
    createRulesText(
      "Hit the drums to make as many numbers as you can in 1 minute"
    ),
    startButton
  ];
  ruleElements.forEach(element => {
    gameContainer.appendChild(element);
  });
  startButton.addEventListener("click", event => {
    event.preventDefault();
    const drumTotal = score(); // eslint-disable-line no-undef
    const playerScore = score(); // eslint-disable-line no-undef
    loadGame(drumTotal, playerScore);
  });
};

const loadGame = (drumTotal, playerScore) => {
  killChildren([gameContainer]);
  playerScore.reset();
  drumTotal.reset();
  const currentTarget = target(); // eslint-disable-line no-undef

  buildHeader(drumTotal, currentTarget, playerScore);

  const drumTotalContainer = document.getElementById("score").firstChild;
  renderDrums(drumTotal, drumTotalContainer);

  startTimer(60, () => endGame(playerScore));
};

const buildHeader = (drumTotal, currentTarget, playerScore) => {
  killChildren([headerContainer]);

  const headerTopRow = document.createElement("div");
  headerTopRow.classList.add("header-row");
  const headerTopRowElements = [
    createBackButton(),
    createDrumTotal(drumTotal),
    createResetButton()
  ];
  populateHeaderRow(headerTopRow, headerTopRowElements);

  const headerBottomRow = document.createElement("div");
  headerBottomRow.classList.add("header-row", "header-row--2");
  const headerBottomRowElements = [
    createRockwell(true),
    createTarget(currentTarget.set(0)),
    createSubmitButton()
  ];
  populateHeaderRow(headerBottomRow, headerBottomRowElements);

  headerContainer.appendChild(headerTopRow);
  headerContainer.appendChild(headerBottomRow);

  document.getElementById("back").addEventListener("click", () => {
    document.location.href = "/numdrum";
  });

  const drumTotalValue = document.getElementById("score").firstChild;
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    drumTotalValue.textContent = drumTotal.reset();
  });

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => {
    if (drumTotal.get() === currentTarget.get()) {
      playerScore.add(1);
      screen.classList.add("animate-background");
      setTimeout(() => screen.classList.remove("animate-background"), 2000);
    } else {
      screen.classList.add("shake-element");
      setTimeout(() => screen.classList.remove("shake-element"), 1000);
    }
    drumTotalValue.textContent = drumTotal.reset();
    currentTarget.set(playerScore.get());
    const targetNumber = document.querySelector(".target-number");
    targetNumber.textContent = currentTarget.get();
  });
};

const renderDrums = (drumTotal, drumTotalContainer) => {
  drums.forEach(drum => {
    const drumImage = document.createElement("img");
    drumImage.src = drum.src;
    drumImage.alt = drum.alt;
    drumImage.classList.add("drum");
    drumImage.id = `drum${drum.value}`;
    drumImage.addEventListener("click", e => {
      e.preventDefault();
      hitDrum(drum.value, drumImage.id, drumTotal, drumTotalContainer);
    });
    gameContainer.appendChild(drumImage);
  });
};

const hitDrum = (num, drumId, drumTotal, drumTotalContainer) => {
  drumTotalContainer.textContent = drumTotal.add(num);
  playSound(drumId); // eslint-disable-line no-undef
  document.getElementById(drumId).classList.toggle(drumId + "--clicked");
};

const startTimer = (seconds, cb) => {
  const timer = createTimer(seconds);
  const x = setInterval(() => {
    if (seconds > 0) {
      timer.innerText = seconds;
      seconds--;
    } else {
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
  killChildren([gameContainer, headerContainer]);

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

const killChildren = containerArray => {
  containerArray.forEach(container => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
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

const createDrumTotal = drumTotal => {
  const drumTotalContainer = document.createElement("div");
  drumTotalContainer.id = "score";
  const drumTotalValue = document.createElement("h1");
  drumTotalValue.textContent = drumTotal.reset();
  drumTotalContainer.appendChild(drumTotalValue);
  return drumTotalContainer;
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

const createRockwell = header => {
  const rockwell = document.createElement("img");
  rockwell.src = "/assets/svg/rockwell_face.svg";
  rockwell.alt = "Rockwell the dog";
  if (header) {
    rockwell.classList.add("header-rockwell");
  }
  return rockwell;
};

const populateHeaderRow = (row, elements) => {
  elements.forEach(element => {
    row.appendChild(element);
  });
};

const createRulesTitle = titleText => {
  const title = document.createElement("h1");
  title.textContent = titleText;
  return title;
};

const createRulesText = ruleText => {
  const rules = document.createElement("p");
  rules.classList.add("paragraph-large");
  rules.textContent = ruleText;
  return rules;
};

const createStartButton = () => {
  const startButton = document.createElement("button");
  startButton.textContent = "Start!";
  return startButton;
};

const createTimer = seconds => {
  const timer = document.createElement("div");
  timer.classList.add("timer");
  timer.innerText = seconds;
  gameContainer.appendChild(timer);
  return timer;
};
