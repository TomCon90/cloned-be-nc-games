const { commentCountToNumber } = require("../utils/utils");

describe("Testing commentCountToNumber function", () => {
  describe("Testing core functionality", () => {
    test("takes and empty array and returns an empty array", () => {
      const input = [];
      const expected = true;
      const actual = commentCountToNumber(input);
      expect(Array.isArray(actual)).toBe(expected);
    });
    test("converts the comment_count from a string to a number and returns it in the object", () => {
      const input = [
        {
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
          comment_count: "3",
        },
      ];
      const expected = [
        {
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
          comment_count: 3,
        },
      ];
      const actual = commentCountToNumber(input);
      expect(actual).toEqual(expected);
    });
    test("converts wors with arrays of multiple objects", () => {
      const input = [
        {
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
          comment_count: "3",
        },
        {
          review_id: 4,
          owner: "testperson1",
          title: "Catan",
          review_body: "Tricky game",
          designer: "Ann Perkins",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          category: "resource",
          created_at: "any date",
          votes: 100,
          comment_count: "7",
        },
      ];
      const expected = [
        {
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
          comment_count: 3,
        },
        {
          review_id: 4,
          owner: "testperson1",
          title: "Catan",
          review_body: "Tricky game",
          designer: "Ann Perkins",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          category: "resource",
          created_at: "any date",
          votes: 100,
          comment_count: 7,
        },
      ];
      const actual = commentCountToNumber(input);
      expect(actual).toEqual(expected);
    });
  });
});
