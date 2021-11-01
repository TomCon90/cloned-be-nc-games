const db = require("../../db");
// const format = require("pg-format");

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
    });

  // 2. insert data
};

module.exports = seed;
