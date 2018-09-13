/* eslint-disable */

const request = require("supertest");
const router = require("../src/app");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(router)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the numdrum route", () => {
  test("It should return 200", done => {
    request(router)
      .get("/numdrum")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the 404 path", () => {
  test("It should response the GET method", done => {
    request(router)
      .get("/nonexistentpage")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe("Test the 500 path", () => {
  test("It should return a 500 error on /error route", done => {
    request(router)
      .get("/error")
      .then(response => {
        expect(response.statusCode).toBe(500);
        done();
      });
  });
});
