const db = require("../db/index.js");
const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("testing app():", () => {
  describe("HAPPY PATH /api/categories", () => {
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
  describe("HAPPY PATH /api/reviews", () => {
    describe("GET", () => {
      describe("GET reviews", () => {
        test.only("status 200: returns the reviews for the given id", () => {
          return request(app)
            .get("/api/reviews/2")
            .expect(200)
            .then(({ body }) => {
              const review = body;
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
              expect(review.review.comment_count).toEqual(3);
            });
        });
        test.only("status 200: returns all reviews", () => {
          return request(app)
            .get("/api/reviews")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              const testReview = {
                review_id: expect.any(Number),
                owner: expect.any(String),
                title: expect.any(String),
                review_body: expect.any(String),
                designer: expect.any(String),
                review_img_url: expect.any(String),
                category: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              };
              expect(reviews.length).toBe(13);
              reviews.forEach((review) => {
                expect(review).toEqual(testReview);
              });
            });
        });
        test("status 200: returns all reviews sorted by created_at by default", () => {
          return request(app)
            .get("/api/reviews")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("created_at");
            });
        });
        test("status 200: returns all reviews sorted by any specified field", () => {
          return request(app)
            .get("/api/reviews?sort_by=votes")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("votes");
            });
        });
        test("status 200: returns all reviews sorted by any specified field", () => {
          return request(app)
            .get("/api/reviews?sort_by=title")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("title");
            });
        });
        test("status 200: returns all reviews sorted by age in reverse order", () => {
          return request(app)
            .get("/api/reviews?order=desc")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("created_at", { descending: true });
            });
        });
        test("status 200: Can take two queries sorting by x and ordering by y", () => {
          return request(app)
            .get("/api/reviews?sort_by=votes&order=desc")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("votes", {
                descending: true,
              });
            });
        });
        test("status 200: returns all reviews that match a filter query on category", () => {
          return request(app)
            .get("/api/reviews?category=dexterity")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              reviews.forEach((review) => {
                expect(review.category).toBe("dexterity");
              });
              expect(reviews.length).toBe(1);
            });
        });
      });
      describe("GET comments", () => {});
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
    describe("GET requests", () => {
      test("status 404: GET api/notaroute responds with message that URL not found", () => {
        return request(app)
          .get("/api/notaroute")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("URL not found");
          });
      });
      test("status: 400, GET api/reviews/notanId responds with an error message when passed a bad ID", () => {
        return request(app)
          .get("/api/reviews/notAnId")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid query");
          });
      });
      test("status: 404, GET api/reviews/999 responds with an error message when passed an ID that doesn't exist", () => {
        return request(app)
          .get("/api/reviews/999")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("ID does not exist");
          });
      });
    });
    describe("PATCH requests", () => {
      test("status: 400, PATCH api/reviews/notanID responds with an error message when passed a bad ID", () => {
        return request(app)
          .patch("/api/reviews/notAnId")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid query");
          });
      });
      test("status: 404, PATCH api/reviews/999 responds with an error message when passed an ID that doesn't exist", () => {
        return request(app)
          .patch("/api/reviews/999")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("ID does not exist");
          });
      });
      test("status: 400, PATCH no input values - responds with an error message when user makes a bad request", () => {
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
    describe("Query issues", () => {
      test("status 400: GET api/reviews?sort_by=notvalid responds with message that Bad Request: cannot sort with given parameter", () => {
        return request(app)
          .get("/api/reviews?sort_by=playing_time")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe(
              "Bad Request: cannot sort with given parameter"
            );
          });
      });
      test("status 400: GET api/reviews?order=notvalid responds with message that Bad Request: Sort order invalid", () => {
        return request(app)
          .get("/api/reviews?order=mixed")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request: Sort order invalid");
          });
      });
    });
  });
});
