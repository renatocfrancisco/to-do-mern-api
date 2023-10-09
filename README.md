# to-do-mern-api

![GitHub](https://img.shields.io/github/license/renatocfrancisco/to-do-mern-api)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/renatocfrancisco/to-do-mern-api)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Jest](https://img.shields.io/badge/-Jest-%2399425b?style=flat&logo=jest&logoColor=white)](https://jestjs.io/)

Express API for [to-do-mern-app](https://github.com/renatocfrancisco/to-do-mern-app)

[Download zip file](https://github.com/renatocfrancisco/to-do-mern-api/archive/refs/heads/main.zip), get the [latest release](https://github.com/renatocfrancisco/to-do-mern-api/releases/latest) or execute:
```
git clone https://github.com/renatocfrancisco/to-do-mern-api
```

## commands

`npm i` to install dependencies <br>
`npm start` to start the server <br>
`npm run dev` to start the server with [nodemon](https://nodemon.io/) <br>
`npm run format` to format the code using [standard-js](https://standardjs.com/) <br>
`npm run test` to run the tests using [jest](https://jestjs.io/) and [axios](https://axios-http.com/) <br>
Need to create a `.env` file for the test and secret environment variables. <br>

### documents

user

```json
{
  "username": "String",
  "password": "String",
  "admin": Boolean
}
```

task

```json
{
  "user": ObjectId,
  "task": "String",
  "priority": "String",
  "status": "String"
}
```
