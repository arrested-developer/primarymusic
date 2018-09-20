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
  module.exports = { score, target };
}
