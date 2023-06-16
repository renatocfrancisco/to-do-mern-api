# to-do-mern-api

![GitHub](https://img.shields.io/github/license/renatocfrancisco/to-do-mern-api)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/renatocfrancisco/to-do-mern-api)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)

<details>
<summary>mongodb</summary>

### user

```json
{
  "username": "string",
  "password": "string"
}
```

### task

```json
{
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  "task": "String",
  "description": "String",
  "priority": "String",
  "status": "String"
}
```

</details>
