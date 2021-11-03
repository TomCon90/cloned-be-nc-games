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
        test("status 200: returns the reviews for the given id", () => {
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
        test("status 200: returns all reviews", () => {
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
              expect(reviews).toBeSortedBy("created_at", {
                descending: true,
              });
            });
        });
        test("status 200: returns all reviews sorted by any specified field", () => {
          return request(app)
            .get("/api/reviews?sort_by=votes")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("votes", {
                descending: true,
              });
            });
        });
        test("status 200: returns all reviews sorted by any specified field", () => {
          return request(app)
            .get("/api/reviews?sort_by=title")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("title", {
                descending: true,
              });
            });
        });
        test("status 200: returns all reviews sorted by age in reverse order", () => {
          return request(app)
            .get("/api/reviews?order=asc")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("created_at", { ascending: true });
            });
        });
        test("status 200: Can take two queries sorting by x and ordering by y", () => {
          return request(app)
            .get("/api/reviews?sort_by=votes&order=asc")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              expect(reviews).toBeSortedBy("votes", {
                ascending: true,
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
        test("status 200: returns all reviews that match a filter query on category, sorted by a query, ordered by a query", () => {
          return request(app)
            .get("/api/reviews?sort_by=votes&order=asc&category=dexterity")
            .expect(200)
            .then(({ body }) => {
              const { reviews } = body;
              reviews.forEach((review) => {
                expect(review.category).toBe("dexterity");
              });
              expect(reviews.length).toBe(1);
              expect(reviews).toBeSortedBy("votes", {
                descending: true,
              });
            });
        });
      });
      describe("GET comments", () => {
        test("status 200: returns all comments for the relevant review_id", () => {
          return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then(({ body }) => {
              const { comments } = body;
              const testComments = {
                comment_id: expect.any(Number),
                author: expect.any(String),
                votes: expect.any(String),
                created_at: expect.any(String),
                body: expect.any(String),
              };
              expect(comments.length).toBe(3);
              expect(comments[0].author).toEqual("bainesface");
            });
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
    describe("POST", () => {
      test("Status 201: responds with the updated review", () => {
        const newComment = {
          username: "mallionaire",
          body: "A great game to TEST your skills",
        };
        return request(app)
          .post("/api/reviews/2/comments")
          .send(newComment)
          .expect(201)
          .then(({ body }) => {
            expect(body).toEqual({
              comment_id: 7,
              review_id: 2,
              votes: 0,
              created_at: expect.any(String),
              author: "mallionaire",
              body: "A great game to TEST your skills",
            });
          });
      });
    });
  });
  describe("HAPPY PATH /api/comments", () => {
    describe("GET", () => {
      test.only("status:200 response with an array of comment objects", () => {
        return request(app)
          .get("/api/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;
            expect(comments).toHaveLength(6);
            comments.forEach((comment) => {
              expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                author: expect.any(String),
                review_id: expect.any(Number),
                created_at: expect.any(String),
                body: expect.any(String),
              });
            });
          });
      });
    });
    describe("DELETE", () => {
      test("Status 204: responds with no content", () => {
        return request(app)
          .delete("/api/comments/6")
          .expect(204)
          .then(() => {
            return request(app).get("/api/comments").expect(200);
          })
          .then(({ body }) => {
            expect(body.comment).toHaveLength(7);
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
      test("status: 400, GET api/reviews/notanId/comments responds with an error message when passed a bad ID", () => {
        return request(app)
          .get("/api/reviews/notAnId/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid query");
          });
      });
      test("status: 404, GET api/reviews/999/comments responds with an error message when passed an ID that doesn't exist", () => {
        return request(app)
          .get("/api/reviews/999/comments")
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
    describe("POST requests", () => {
      test("status: 400, POST api/reviews/notanID/comments responds with an error message when passed a bad ID", () => {
        const newComment = {
          username: "mallionaire",
          body: "A great game to TEST your skills",
        };
        return request(app)
          .post("/api/reviews/notAnId/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid query");
          });
      });
      test("status: 404, POST api/reviews/999/comments responds with an error message when passed an Incorrect input", () => {
        const newComment = {
          username: "mallionaire",
          body: "A great game to TEST your skills",
        };
        return request(app)
          .post("/api/reviews/999/comments")
          .send(newComment)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Incorrect input");
          });
      });
      test("status: 404, POST api/reviews/2/comments responds with an error message when passed an Incorrect input", () => {
        const newComment = {
          username: "tester123",
          body: "A great game to TEST your skills",
        };
        return request(app)
          .post("/api/reviews/2/comments")
          .send(newComment)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Incorrect input");
          });
      });
      test("status: 404, POST api/reviews/2/comments responds with an error message when passed an ID that doesn't exist", () => {
        const newComment = {
          username: "mallionaire",
          body: [],
        };
        return request(app)
          .post("/api/reviews/2/comments")
          .send(newComment)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Incorrect data type");
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
});
