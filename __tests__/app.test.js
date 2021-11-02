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
  });
  describe("/api/reviews", () => {
    describe("GET", () => {
      test("status 200: returns the reviews for the given id", () => {
        return request(app)
          .get("/api/reviews/2")
          .expect(200)
          .then(({ body }) => {
            const review = body;
            console.log(review);
            const testReviews = {
              review_id: expect.any(Number),
              owner: expect.any(String),
              title: expect.any(String),
              review_body: expect.any(String),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(Date),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            };
            expect(review.review.title).toBe("Jenga");
            expect(review.review.comment_count).toEqual("3");
          });
      });
    });
  });
  describe("Errors", () => {
    test("status 404: responds with message that URL not found", () => {
      return request(app)
        .get("/api/notaroute")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("URL not found");
        });
    });
    test.only("status: 400, responds with an error message when passed a bad ID", () => {
      return request(app)
        .get("/api/reviews/notAnId")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid query");
        });
    });
    test("status: 404, responds with an error message when passed an ID that doesnt exist", () => {
      return request(app)
        .delete("/api/reviews/999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("ID does not exist");
        });
    });
  });
});
