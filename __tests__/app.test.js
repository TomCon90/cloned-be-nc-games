const db = require("../db/index.js");
const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("testing app():", () => {
  describe("/api/categories", () => {
    describe("GET", () => {
      test("status 200: returns all categories", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then(({ body }) => {
            const { categories } = body;
            const testCategory = {
              slug: expect.any(String),
              description: expect.any(String),
            };
            expect(categories.length).toBe(4);
            categories.forEach((category) => {
              expect(category).toEqual(testCategory);
            });
          });
      });
    });
    describe("Errors", () => {
      test.only("status 404: responds with message that URL not found", () => {
        return request(app)
          .get("/api/notaroute")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("URL not found");
          });
      });
    });
  });
});
