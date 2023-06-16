# to-do-mern-api

<!-- license -->
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<!-- size -->
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