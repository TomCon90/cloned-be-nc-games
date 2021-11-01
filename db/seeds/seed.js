const db = require("../../db");
const format = require("pg-format");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables

  return db
    .query(`DROP TABLE IF EXISTS categories CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS comments;`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE categories (
        slug VARCHAR PRIMARY KEY,
        description VARCHAR(255) NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        avatar_url VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`
  CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      review_body VARCHAR NOT NULL,
      designer VARCHAR(255) NOT NULL,
      review_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes SMALLINT DEFAULT 0,
      category VARCHAR NOT NULL REFERENCES categories(slug),
      owner VARCHAR NOT NULL REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);
    })
    .then(() => {
      return db.query(`
  CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR NOT NULL REFERENCES users(username),
      review_id INT REFERENCES reviews(review_id),
      votes SMALLINT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body VARCHAR NOT NULL
  );`);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO categories
  (slug, description)
  VALUES
  %L
  RETURNING *;`,
        categoryData.map((item) => [item.slug, item.description])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO users
      (username, name, avatar_url)
      VALUES
      %L
      RETURNING *;`,
        userData.map((item) => [item.username, item.name, item.avatar_url])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO reviews
      (title, designer, owner, review_img_url, review_body, category, created_at, votes)
      VALUES
      %L
      RETURNING *;`,
        reviewData.map((item) => [
          item.title,
          item.designer,
          item.owner,
          item.review_img_url,
          item.review_body,
          item.category,
          item.created_at,
          item.votes,
        ])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO comments
      (body, votes, author, review_id, created_at)
      VALUES
      %L
      RETURNING *;`,
        commentData.map((item) => [
          item.body,
          item.votes,
          item.author,
          item.review_id,
          item.created_at,
        ])
      );
      return db.query(queryStr);
    });

  // 2. insert data
};

module.exports = seed;
