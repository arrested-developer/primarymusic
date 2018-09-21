/* eslint-disable */

const {
  score,
  target,
  evalScore,
  generateNumber
} = require("../public/assets/scripts/logic");

describe("Score and target tests", () => {
  const testScore = score();
  test("Testing score methods", () => {
    expect(testScore.add(5)).toBe(5);
    expect(testScore.get()).toBe(5);
    expect(testScore.reset()).toBe(0);
  });
  const testTarget = target();
  test("Testing target methods", () => {
    expect(testTarget.get()).toBe(0);
    expect(typeof testTarget.set(0)).toBe("number");
  });
});

describe("Timed mode tests", () => {
  test("Test evalScore - easy, medium & hard", () => {
    expect(evalScore(0)).toBe("easy");
    expect(evalScore(7)).toBe("medium");
    expect(evalScore(25)).toBe("hard");
  });
  test("Test generateNumber", () => {
    expect(generateNumber(0)).toBeLessThan(100);
    expect(generateNumber(0)).toBeGreaterThan(0);
    expect(generateNumber(7)).toBeLessThan(10000);
    expect(generateNumber(7)).toBeGreaterThan(0);
    expect(generateNumber(25)).toBeLessThan(10000);
    expect(generateNumber(25)).toBeGreaterThan(0);
  });
});
