# Tom's House of Games API

## Hosted API Version

If you are interested in seeing the API running please click on the link below.
[Tom's House of Games](https://tc-nc-games.herokuapp.com/api).

## Overview

This was a Northcoders project to complete the three week Back End segment of the course.

This project looked at establishing our first API with various endpoints.

I have looked to utilise my understanding of the following concepts that we have learnt during this section of the course;

- Http Create Server
- express 101
- Model View Controller
- Middleware
- Routers
- SQL Setup
- node Postgres
- Supertest
- Error Handling
- Seeding
- Complex Queries
- Hosting with Heroku

## Instructions

To host a local version of this API please follow the steps below;

- Fork and Clone this repository to your own Github account
- Copy the link and clone within your desired file
- Run npm install to ensure all the necessary packages are set up

Once installed you will need to establish your database by running the command `npm run setup-dbs`.

To then populate your tables with your data use `npm run seed`.

Finally to check the established tests provided you can run `npm test`. These tests have been broken up into smaller bite-size packages and will reset with each npm test.

## Further Setup & Requirements

In addition to the above there is one further important setup step. To determine which data is used you will need to create two .env files, as outlined below;

`.env.dev` file for you development data containing;

- PGDATABASE=nc_games

`.env.test` file for your test data containing;

- PGDATABASE=nc_games_test

For safety these files will automatically be placed within the .gitignore file

Finally the API will need the following;

- `Node.js` version 6.9.0 or above.
- `postgres` version 2.2.0 or above.
