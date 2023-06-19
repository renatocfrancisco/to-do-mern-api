const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const { db } = require('./config/db')

const routes = require('./routes/index')
const user = require('./routes/user')
const task = require('./routes/task')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Successful MongoDB connection!')
})
db.on('disconnected', () => {
  console.log('MongoDB disconnected!')
})

const app = express()

app.use(helmet(), cors(), compression(), morgan('dev'), express.json())
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.send('Hello World! This is the root route of to-do-mern-api')
})

routes(app)
app.use('/user', user)
app.use('/task', task)

module.exports = app
