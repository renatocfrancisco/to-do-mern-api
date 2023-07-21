require('dotenv').config()
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

const app = express()

app.use(helmet(), cors(), compression(), morgan('dev'), express.json())
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
app.disable('x-powered-by')

app.get('/', (_req, res) => {
  res.send('Hello World! This is the root route of to-do-mern-api')
})

routes(app)
app.use('/users', user)
app.use('/tasks', task)

module.exports = app
