# to-do-mern-api

![GitHub](https://img.shields.io/github/license/renatocfrancisco/to-do-mern-api)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/renatocfrancisco/to-do-mern-api)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%2399425b?style=flat&logo=jest&logoColor=white)

`npm i` to install dependencies <br>
`npm start` to start the server <br>
`npm run dev` to start the server with [nodemon](https://nodemon.io/) <br>
`npm run format` to format the code using [standard-js](https://standardjs.com/) <br>
`npm run test` to run the tests using [jest](https://jestjs.io/) and [axios](https://axios-http.com/) <br>
Need to create a `.env` file for the test and secret environment variables. <br>

<details>
<summary>models</summary>

### user

```json
{
  "username": "String",
  "password": "String",
  "admin": Boolean
}
```

### task

```json
{
  "user": ObjectId,
  "task": "String",
  "priority": "String",
  "status": "String"
}
```

</details>
