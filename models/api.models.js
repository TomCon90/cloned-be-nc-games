const db = require("../db");

exports.selectAllEndpoints = () => {
  return {
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
    },
    "GET /api/categories": {
      description: "serves an array of all categories",
      queries: [],
      exampleResponse: {
        categories: [
          {
            description: "Players attempt to uncover each other's hidden role",
            slug: "Social deduction",
          },
        ],
      },
    },
    "GET /api/reviews": {
      description: "serves an array of all reviews",
      queries: ["category", "sort_by", "order"],
      exampleResponse: {
        reviews: [
          {
            title: "One Night Ultimate Werewolf",
            designer: "Akihisa Okui",
            owner: "happyamy2016",
            review_img_url:
              "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            category: "hidden-roles",
            created_at: 1610964101251,
            votes: 5,
          },
        ],
      },
    },
    "GET /api/reviews/:review_id": {
      description: "serves a selected review",
      exampleResponse: {
        review: {
          title: "One Night Ultimate Werewolf",
          designer: "Akihisa Okui",
          owner: "happyamy2016",
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          category: "hidden-roles",
          created_at: 1610964101251,
          votes: 5,
        },
      },
    },
    "PATCH /api/reviews/:review_id": {
      description:
        "updates the given field within the review associated to review_id",
      exampleOriginal: {
        review: {
          title: "One Night Ultimate Werewolf",
          designer: "Akihisa Okui",
          owner: "happyamy2016",
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          category: "hidden-roles",
          created_at: 1610964101251,
          votes: 5,
        },
      },
      "example input": { inc_votes: 100 },
      exampleResponse: {
        review: {
          title: "One Night Ultimate Werewolf",
          designer: "Akihisa Okui",
          owner: "happyamy2016",
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          category: "hidden-roles",
          created_at: 1610964101251,
          votes: 105,
        },
      },
    },
    "GET /api/reviews/:review_id/comments": {
      description: "serves an array of all comments linked to the review_id",
      exampleResponse: {
        review: [
          {
            body: "I loved this game too!",
            votes: 16,
            author: "bainesface",
            review_id: 2,
            created_at: 1511354613389,
          },
          {
            body: "EPIC board game!",
            votes: 16,
            author: "bainesface",
            review_id: 2,
            created_at: 1511354163389,
          },
          {
            body: "Now this is a story all about how, board games turned my life upside down",
            votes: 13,
            author: "mallionaire",
            review_id: 2,
            created_at: 1610965445410,
          },
        ],
      },
    },
    "POST /api/reviews/:review_id/comments": {
      description: "adds a news comment linked to the provided review_id",
      exampleResponse: {
        comment: {
          body: "A cracker!",
          votes: 0,
          author: "bainesface",
          review_id: 2,
          created_at: 1511354613389,
        },
      },
    },
    "GET /api/comments": {
      description: "serves an array of all comments",
      exampleResponse: {
        comments: [
          {
            body: "I loved this game too!",
            votes: 16,
            author: "bainesface",
            review_id: 2,
            created_at: 1511354613389,
          },
        ],
      },
    },
    "GET /api/users": {
      description: "serves an array of all usernames",
      exampleResponse: {
        users: [
          { username: "mallionaire" },
          { username: "philippaclaire9" },
          { username: "bainesface" },
          { username: "dav3rid" },
        ],
      },
    },
    "GET /api/users/:username": {
      description:
        "serves a object with the full details of the user specified by the username",
      exampleResponse: {
        user: {
          username: "philippaclaire9",
          name: "philippa",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        },
      },
    },
    "DELETE /api/comments/:comments_id": {
      description: "removes the selected comment linked to comment_id",
    },
    "PATCH /api/comments/:comments_id": {
      description:
        "updates the given field within the comments associated to comment_id",
      exampleOriginal: {
        review: {
          body: "My dog loved this game too!",
          votes: 13,
          author: "mallionaire",
          review_id: 3,
          created_at: 1610964545410,
        },
      },
    },
    "example input": { inc_votes: 10 },
    exampleResponse: {
      review: {
        body: "My dog loved this game too!",
        votes: 23,
        author: "mallionaire",
        review_id: 3,
        created_at: 1610964545410,
      },
    },
    "DELETE /api/reviews/:review_id": {
      description: "removes the selected review linked to review_id",
    },
    "POST /api/reviews": {
      description: "adds a new review",
      exampleResponse: {
        review: {
          owner: "mallionaire",
          title: "This game TESTS my patience!",
          review_body: "I TESTED this game and it passed the TEST",
          designer: "Uwe Rosenberg",
          category: "dexterity",
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          review_id: 45,
          votes: 0,
          created_at: 1610964545410,
          comment_count: 0,
        },
      },
    },
    "POST /api/categories": {
      description: "adds a new category",
      exampleResponse: {
        category: {
          slug: "difficult",
          description: "This game is particularly tricky",
        },
      },
    },
  };
};
