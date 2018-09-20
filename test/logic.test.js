/* eslint-disable */

const logic = require("../public/assets/scripts/logic");
const {
  generateNumber,
  evalScore,
  checkNumber
} = require("../public/assets/scripts/timed-mode");

describe("Score tests", () => {
  const score = logic();
  test("Testing get method", () => {
    expect(score.add(5)).toBe(5);
    expect(score.get()).toBe(5);
    expect(score.reset()).toBe(0);
  });
});

describe("Timed mode tests", () => {
  test("Testing check number function", () => {
    expect(checkNumber(6, 6)).toBeTruthy();
    expect(checkNumber(6, 5)).toBeFalsy();
  });
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
