require('dotenv').config()
const app = require('./app')
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`)
})
