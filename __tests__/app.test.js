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
    describe("PATCH", () => {
      test("Status 200: responds with the updated review", () => {
        const update = { inc_votes: 10 };
        return request(app)
          .patch("/api/reviews/2")
          .send(update)
          .expect(200)
          .then(({ body }) => {
            expect(body.review).toEqual({
              review_id: 2,
              owner: "philippaclaire9",
              title: "Jenga",
              review_body: "Fiddly fun for all the family",
              designer: "Leslie Scott",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              category: "dexterity",
              created_at: "2021-01-18T10:01:41.251Z",
              votes: 15,
            });
          });
      });
      test("Status 200: responds with the updated review", () => {
        const minusUpdate = { inc_votes: -5 };
        return request(app)
          .patch("/api/reviews/2")
          .send(minusUpdate)
          .expect(200)
          .then(({ body }) => {
            expect(body.review).toEqual({
              review_id: 2,
              owner: "philippaclaire9",
              title: "Jenga",
              review_body: "Fiddly fun for all the family",
              designer: "Leslie Scott",
              review_img_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              category: "dexterity",
              created_at: "2021-01-18T10:01:41.251Z",
              votes: 0,
            });
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
    test("status: 400, responds with an error message when passed a bad ID", () => {
      return request(app)
        .get("/api/reviews/notAnId")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid query");
        });
    });
    test("status: 404, responds with an error message when passed an ID that doesn't exist", () => {
      return request(app)
        .get("/api/reviews/999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("ID does not exist");
        });
    });
    test("status: 400, responds with an error message when passed a bad ID", () => {
      return request(app)
        .patch("/api/reviews/notAnId")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid query");
        });
    });
    test("status: 404, responds with an error message when passed an ID that doesn't exist", () => {
      return request(app)
        .patch("/api/reviews/999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("ID does not exist");
        });
    });
    test("status: 400, responds with an error message when user makes a bad request", () => {
      const badIncVote = {};
      return request(app)
        .patch("/api/reviews/2")
        .send(badIncVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Empty object");
        });
    });
  });
});
