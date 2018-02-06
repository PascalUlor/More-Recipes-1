[![Build Status](https://travis-ci.org/chykehyman/More-Recipes.svg?branch=develop)](https://travis-ci.org/chykehyman/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/chykehyman/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/chykehyman/More-Recipes?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/b36cde19b8b50a231465/maintainability)](https://codeclimate.com/github/chykehyman/More-Recipes/maintainability)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)

# <div style="text-align:center"><img style="width:50px; height:50px;" src="http://res.cloudinary.com/chykebaba/image/upload/v1516407676/logo_jb4hn4.png"/> More-Recipes</div>

### Share Your Special Recipe Ideas Instanly

More-Recipes provides a platform for users to share the awesome
and exciting recipe ideas they have invented or learnt, get feedback in form of
reviews and votes from other users who explore that recipe.

More-Recipes is built with Javascript (ES6), ReactJs , Redux, NodeJs

## Features
- User Signup and Signin
- Create/Add, modify or delete recipes
- View recipes from other users
- View popular recipes
- View details of recipes
- Post reviews on recipes
- Upvote and downvote recipes
- Bookmark recipes as favorites
- View and update user profile
- Email notifications when a recipe reviewed
- Email notifications when recipes a user favorited gets modified 


## Built With
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.
* [ReactJS](https://www.reactjs.org/) - A JavaScript library for building dynamic user interfaces.
* [Redux](http://redux.js.org/) -  A predictable state container for JavaScript apps. Manages states of the application
* [Bootstrap V4](https://getbootstrap.com/) -  A CSS framework supported by Twitter.

## Installation

1. Install [`node`](https://nodejs.org/en/download/), version 6 or greater

2. Install [`postgres`](https://www.postgresql.org/download/)

3. Clone the repo and cd into it

    ```
    git clone https://github.com/chykehyman/More-Recipes.git
    cd More-Recipes
    ```

4. Install all dependencies

    ```
    npm install
    ```

5. Configure Postgres

    ```
    configure your database settings for development and test in
    `./server/config/db_url.js` 
    ```

6.  Run database migrations

    ```
    $ npm run migrate:dev
    ```

7. Add a `.env` file in root of project and setup the following:

    ```
    SECRET_KEY=anyWordsOfYourChoice
    DATABASE_URL=elephantSqlOnlineDatabaseLink
    USERNAME=postgres
    PASSWORD=yourDatabasePassword
    DATABASE_DEV=yourDatabaseName
    HOST=127.0.0.1
    DIALECT=postgres
    DEFAULT_IMAGE_URL=aHostDefaultImageOfYourChoice
    CLOUDINARY_URL=yourCloudinaryUrl
    CLOUDINARY_UPLOAD_PRESET=yourCloudinaryUploadPreset
    AUTHORIZED_EMAIL=yourGmailAccount
    AUTHORIZED_PASSWORD=yourGmailPassword
    ```

8. Start the app

    ```
    npm start:dev
    ```

9. Open running application

    ```
    http://localhost:7777/


## Testing
The app uses: 
* `Mocha/Chai` and `Super-Test` for backend testing.

> - `npm test` - to run tests and display code coverage results


## API Documentation
Click [Here](https://more-recipes-v1.herokuapp.com/apidocs) to view our detailed API documentation

## Contributing

If you are interested in contributing to the development of this project ,
check the [contributing](contributing.md) file.


## License
[MIT](LICENSE)

## Author
* **Chinwoke Hyginus** -Software Developer and Soccer Frick.


## FAQ

### Is this an Open-Source Application?

```
Yes it is, and contributing to the development of this application is by raising PRs.
```

### Who can contribute?

```
Anyone! This application is open to all those who want to contribute to open-source 
development and are willing to follow set standards for contributing.
```

### Is there a set standard for PRs to this repository?

```
Yes, there are set conventions for PRs to this repository and can be found in the 
project wiki.
```

### What language was used to develop this application?

```
This project is a full stack Javascript application.
```

### Can I clone this application for personal use?

```
Yes! This application is licensed under MIT, and is open for whatever you may choose 
to use it for.
```