const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
    .then(() => console.log('Successful MongoDB connection!'))
    .catch((err) => {
      console.log('MongoDB connection error: ', err)
      setTimeout(connect, 5000)
    })
}

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected! Reconnecting...')
  setTimeout(connect, 5000)
})

connect()

module.exports = { db: mongoose.connection }
