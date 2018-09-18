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

if (typeof module !== "undefined") {
  module.exports = score;
}
