const startGuessMode = () => {
  //instantiate two scores
  const scores = {
    playerOne: score(),
    playerTwo: score()
  };

  const getTaps = score => {
    return score + 3;
  };

  // start a new round
  const playRound = score => {
    const taps = getTaps(score);
    console.log(`you have ${taps} taps`);
    currentScore.reset();
  };

  playRound(scores.playerOne.get());
};
