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
});
