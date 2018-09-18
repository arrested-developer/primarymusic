// check for touch events, decide whether to trigger drums on click or tap
const isTouchDevice = () => "ontouchstart" in document.documentElement;
const triggerEvent = isTouchDevice() ? "touchend" : "click";

// disable scrolling
bodyScrollLock.disableBodyScroll();

// declare page elements
const scoreDisplay = document.querySelector("#score > h1");

// instantiate player score
const currentScore = score(); //eslint-disable-line no-undef

// reset button
document.getElementById("reset").addEventListener("click", () => {
  scoreDisplay.textContent = currentScore.reset();
});

const drumList = [
  ["drum1", "ninja.svg", "Ninja, value 1"],
  ["drum10", "burger.svg", "Burger, value 10"],
  ["drum100", "cyclopig.svg", "Cyclopig, value 100"],
  ["drum1000", "frog.svg", "Frög, value 1000"]
];

const renderDrums = drumList => {
  drumList.forEach(drumData => {
    const drum = document.createElement("img");
    drum.classList.add("drum");
    drum.id = drumData[0];
    drum.src = `assets/svg/${drumData[1]}`;
    drum.alt = drumData[2];
    drum.addEventListener(triggerEvent, e => {
      e.preventDefault();
      playSound(drum.id);
      drum.classList.toggle(drum.id + "--clicked");
      console.log(currentScore.add(Number(drum.id.slice(4))));
    });
    document.querySelector("#game").appendChild(drum);
  });
};

// get the next player number
const getNextPlayer = currentPlayer =>
  currentPlayer == 2 ? 1 : currentPlayer + 1;

// get taps allowed for making challenge number
const getTaps = score => score + 3;

// instantiate player scores
const scores = {
  1: score(),
  2: score()
};

const playRound = currentPlayer => {
  renderDrums(drumList);
  const nextPlayer = getNextPlayer(currentPlayer);
  const taps = getTaps(scores[nextPlayer].get());
  console.log(`player ${currentPlayer} has ${taps} taps`);
  const tapCounter = score();
  currentScore.reset();

  // get user input and compare with score
  const checkScore = () => {
    console.log(`player ${nextPlayer} must guess`);
    const inputBox = document.createElement("section");
    const input = document.createElement("input");
    input.type = "text";
    inputBox.appendChild(input);
    const submit = document.createElement("button");
    submit.innerText = "Submit";
    inputBox.appendChild(submit);
    document.querySelector("main").appendChild(inputBox);
    submit.addEventListener(triggerEvent, () => {
      document.querySelector("main").removeChild(inputBox);
      if (currentScore.check(input.value)) {
        console.log(`WINNER, your score is ${scores[nextPlayer].add(1)}`);
      } else {
        console.log("LOSER");
      }
      // TO DO display scores and give option to play next round
      playRound(nextPlayer);
    });
  };

  const clearPage = () => {
    const main = document.querySelector("main");
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  };

  // count number of drum taps and then ask for input
  const checkTaps = () => {
    tapCounter.add(1);
    if (tapCounter.get() == taps) {
      clearPage();
      // drums.forEach(drum => {
      //   drum.removeEventListener(triggerEvent, checkTaps);
      // });
      scoreDisplay.innerText = "";
      checkScore();
    }
  };

  const drums = document.querySelectorAll(".drum");

  drums.forEach(drum => {
    drum.addEventListener(triggerEvent, checkTaps);
  });
};
