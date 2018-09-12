/* eslint-disable */

var score = function() {
  var score = 0;
  return {
    get: function() {
      return score;
    },
    add: function(num) {
      score += num;
      return score;
    },
    reset: function() {
      score = 0;
      return score;
    }
  };
};

module.exports = { score };
