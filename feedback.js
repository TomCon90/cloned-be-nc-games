# BE Northcoders NC Games Portfolio Check List
​
## Readme - Remove the one that was provided and write your own:
​
- ✅  Link to hosted version
- ✅  Write a summary of what the project is
- ✅  Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- ✅  Include information about how to create `.env.test` and `.env.development` files
- ✅  Specify minimum versions of `Node.js` and `Postgres` needed to run the project
  - All of the above can be sorted when you're finished ��
​
## General
​
- ✅ Remove any unnecessary `console.logs` and comments
  - ✅  I would be tempted to remove the log in your `listen` function when you're done
  - ✅ Also, keep the one in your `handle500s` error handler! That will come in useful if anything goes wrong in the future
- ✅  Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
  - Again, something to do when you're finished
  - ✅ I would remove the `.env` file from the repo, there will only be need for the `.env.test` and `.env.development` files
- ✅ .gitignore the `.env` files
​
## Connection to db
​
- ✅ Throw error if `process.env.PGDATABASE` is not set
  - Remember to extend this when hosting ��
​
## Creating tables
​
- ✅ Use `NOT NULL` on required fields
  - ✅ I'd be tempted to also include `NOT NULL` on your default columns also
- ✅ Default `created_at` in reviews and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
  - `CURRENT_TIMESTAMP` achieves the same result
- ✅ Delete all comments when the review they are related to is deleted: Add `ON DELETE CASCADE` to `review_id` column in `comments` table.
  - Something to consider when deleting reviews is in play ��
​
## Inserting data
​
- ✅ Drop tables and create tables in seed function
  - I like your inclusion of `CASCADE` here so that the tables can actually be deleted out of order
    - The fact that you have indeed dropped them in the correct order however leaves it a little redundant
​
## Tests
​
- ✅ Seeding before each test
- ✅ If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- ✅ Ensure all tests are passing
- ✅ Cover all endpoints and errors
​
- `GET /api/categories`
​
  - ✅ Status 200, array of category objects
​
- `GET /api/reviews/:review_id`
​
  - ✅ Status 200, single review object (including `comment_count`)
    - ✅ It is slightly confusing that your tests for the endpoints `/api/reviews/:review_id` and `/api/reviews` are in the same describe as they are entirely separate endpoints - I would consider extracting them into separate describe blocks
    - ✅ You have a variable `testReviews` in this test but it isn't used...
      - ✅ We want to test more generically for "shape" of multiple resources - however for a specific resource we should test for specific values
      - ✅ I can see that you have asserted specifically for the title and comment_count here - I would suggest asserting the other properties too ��
  - ✅ Status 400, invalid ID, e.g. string of "not-an-id"
  - ✅ Status 404, non existent ID, e.g. 0 or 9999
​
- `PATCH /api/reviews/:review_id`
​
  - ✅ Status 200, updated single review object
  - ✅ Status 400, invalid ID, e.g. string of "not-an-id"
  - ✅ Status 404, non existent ID, e.g. 0 or 9999
  - ✅ Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing
​
- `GET /api/reviews`
​
  - ✅ Status 200, array of review objects (including `comment_count`, excluding `body`)
  - ✅ Status 200, default sort & order: `created_at`, `desc`
  - ✅ Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - ✅ Status 200, accepts `order` query, e.g. `?order=desc`
  - ✅ Status 200, accepts `category` query, e.g. `?category=dexterity`
  - ✅  Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - ✅  Status 400. invalid `order` query, e.g. `?order=bananas`
  - ✅ Status 404. non-existent `category` query, e.g. `?category=bananas`
  - ✅ Status 200. valid `category` query, but has no reviews responds with an empty array of reviews, e.g. `?category=children's games`
​
- `GET /api/reviews/:review_id/comments`
​
  - ✅ Status 200, array of comment objects for the specified review
    -✅ For this test, there is again a `testComment` variable which doesn't get used
    - ✅Your assertions are there - I would consider asserting that ALL comments are for the review_id you have specified rather than the author of the first one ��
  - ✅ Status 400, invalid ID, e.g. string of "not-an-id"
  - ✅ Status 404, non existent ID, e.g. 0 or 9999
  - ✅  Status 200, valid ID, but has no comments responds with an empty array of comments
​
- `POST /api/reviews/:review_id/comments`
​
  - ✅ Status 201, created comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
    - This test is here, but you are not actually sending the comment in the post request
    - I might also suggest that "Invalid Query" is a little misleading as to the origin of the error - there isn't a query on this request
  - ✅ Status 404, non existent ID, e.g. 0 or 9999
  - ✅ Status 400, missing required field(s), e.g. no username or body properties
    - The test for this is labeled as a 404 - but you've done it ��
  - ✅ Status 404, username does not exist
  - ✅  Status 201, ignores unnecessary properties
​
- `GET /api`
​
  - ✅  Status 200, JSON describing all the available endpoints
​
## Routing
​
- ✅ Split into api, categories, users, comments and reviews routers
- ✅ Use `.route` for endpoints that share the same path
​
## Controllers
​
- ✅ Name functions and variables well
  - I think my only naming concern here would be `getAllReviewsByID` - by nature of providing an ID, we're not wanting to request ALL reviews
- ✅ Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)
​
## Models
​
- Protected from SQL injection
  - ✅ Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - ✅ Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- ✅ Consistently use either single object argument _**or**_ multiple arguments in model functions
- ✅ Use `LEFT JOIN` for comment counts
  - You have used a sub query instead!
​
## Errors
​
- ✅ Use error handling middleware functions in app and extracted to separate directory/file
  - ✅Makes no behavioural difference at all
  -✅ I might recommend having the error handlers declared in the same order they are passed to `app.use` purely foir the preservation of sanity!
- ✅ Consistently use `Promise.reject` in either models _**OR**_ controllers
​
## Extra Tasks - To be completed after hosting
​
- `DELETE /api/comments/:comment_id`
​
- ✅ Status 204, deletes comment from database
  -  ✅  I like that you make an additional GET request to check for actual deletion as well as correct response!
- ✅ Status 404, non existant ID, e.g 999
- ✅ Status 400, invalid ID, e.g "not-an-id"
​
- `GET /api/users`
​
- ✅  Status 200, responds with array of user objects
​
- `GET /api/users/:username`
​
- ✅  Status 200, responds with single user object
- ✅  Status 404, non existant ID, e.g 999
- [ ] Status 400, invalid ID, e.g "not-an-id"
​
- `PATCH /api/comments/:comment_id`
​
  - ✅  Status 200, updated single comment object
  - ✅  Status 400, invalid ID, e.g. string of "not-an-id"
  - ✅  Status 404, non existent ID, e.g. 0 or 9999
  - ✅  Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing
​
## Extra Advanced Tasks
​
### Easier
​
- [ ] Patch: Edit an review body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an review by title
- [ ] Post: add a new user
​
### Harder
​
- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get reviews created in last 10 minutes
- [ ] Get: Get all reviews that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for categories
​
The above are all suggestions of ways you can take this project further!