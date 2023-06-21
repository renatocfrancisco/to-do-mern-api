const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username must be less than 20 characters long']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  admin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, versionKey: false })

const User = mongoose.model('User', userSchema)

module.exports = User
