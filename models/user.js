const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean
}, { timestamps: true, versionKey: false })

const User = mongoose.model('User', userSchema)

module.exports = User
