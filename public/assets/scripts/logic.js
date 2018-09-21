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

const score = () => {
  let score = 0;
  return {
    get() {
      return score;
    },
    add(num) {
      score += num;
      return score;
    },
    reset() {
      score = 0;
      return score;
    }
  };
};

const target = () => {
  let target = 0;
  return {
    get() {
      return target;
    },
    set(score) {
      target = generateNumber(score);
      return target;
    }
  };
};

if (typeof module !== "undefined") {
  module.exports = { score, target, evalScore, generateNumber };
}
