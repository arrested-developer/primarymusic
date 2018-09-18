// declare page elements
const scoreDisplay = document.querySelector("#score > h1");
const drums = document.querySelectorAll(".drum");

// instantiate player score
const currentScore = score(); //eslint-disable-line no-undef

// reset button
document.getElementById("reset").addEventListener("click", () => {
  scoreDisplay.textContent = currentScore.reset();
});

// hitDrum is a wrapper function which calls individual gameplay elements as each drum is hit
const hitDrum = (num, drum) => {
  scoreDisplay.textContent = currentScore.add(num);
  playSound(drum); //eslint-disable-line no-undef
  document.getElementById(drum).classList.toggle(drum + "--clicked");
};

// go through drums (has class .drum) and attach eventListeners to call hitDrum();
drums.forEach(drum => {
  const drumId = drum.id;
  const drumScore = Number(drum.id.slice(4));
  drum.addEventListener("touchend", e => {
    e.preventDefault();
    hitDrum(drumScore, drumId);
  });
});

// disable scrolling
bodyScrollLock.disableBodyScroll();
