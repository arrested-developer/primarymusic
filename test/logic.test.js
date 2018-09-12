/* eslint-disable */

const logic = require("../public/assets/scripts/logic");

describe("Score tests", () => {
  const score = logic.score();
  test("Testing get method", () => {
    expect(score.add(5)).toBe(5);
    expect(score.get()).toBe(5);
    expect(score.reset()).toBe(0);
  });
});
