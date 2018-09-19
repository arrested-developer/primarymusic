const timedMode = () => {
  loadRules();
};

const buildHeader = () => {
  const headerContainer = document.querySelector("header");
  killChildren(headerContainer);
  const backButton = document.createElement("button");
  backButton.id = "back";
  backButton.classList.add("circle-button");
  const backImage = document.createElement("img");
  backImage.classList.add("arrow--back");
  backImage.src = "assets/svg/arrow_back.svg";
  backImage.alt = "back arrow";
  backButton.appendChild(backImage);
  headerContainer.appendChild(backButton);

  const scoreDiv = document.createElement("div");
  scoreDiv.id = "score";
  const scoreH1 = document.createElement("h1");
  scoreH1.textContent = "0";
  scoreDiv.appendChild(scoreH1);
  headerContainer.appendChild(scoreDiv);

  const resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.classList.add("circle-button");
  const resetImage = document.createElement("img");
  resetImage.classList.add("arrow--reset");
  resetImage.src = "assets/svg/arrow_reset.svg";
  resetImage.alt = "reset icon";
  resetButton.appendChild(resetImage);
  headerContainer.appendChild(resetButton);
};

const loadRules = () => {
  const gameContainer = document.getElementById("game");
  const headerContainer = document.querySelector("header");
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
  const gameContainer = document.getElementById("game");
  killChildren(gameContainer);
  buildHeader();
  const scoreDisplay = document.querySelector("#score > h1");

  // instantiate score objects
  const currentScore = score(); //eslint-disable-line no-undef
  const playerScore = score();

  // render drums
  addDrums(gameContainer, currentScore, scoreDisplay);

  // reset button
  document.getElementById("reset").addEventListener("click", () => {
    console.log(this);
    scoreDisplay.textContent = currentScore.reset();
  });

  // start 60 sec timer
  setTimeout(
    () => alert(`Game Over! Your Score was ${playerScore.get()}`),
    60 * 1000
  );

  // The
  // generate initial:
  const scoreBar = document.getElementById("info");
  let currentNumber = generateNumber(0);
  // display number
  const currentNumberDisplay = document.createElement("h2");
  currentNumberDisplay.textContent = currentNumber;
  // display start button
  const submitButton = document.createElement("button");
  submitButton.id = "submit";
  submitButton.textContent = "Submit";
  /* eslint-disable-next-line */
  scoreBar.appendChild(submitButton);
  scoreBar.appendChild(currentNumberDisplay);
  document.getElementById("submit").addEventListener("click", () => {
    // TODO - fix score, it attaches the scores AT THE TIME THE EVENT LISTENER IS MADE
    // WHAT IT NEEDS: to do them with the score as they ARE when submit is pressed
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

if (typeof module !== "undefined") {
  module.exports = { generateNumber, evalScore, checkNumber };
}
