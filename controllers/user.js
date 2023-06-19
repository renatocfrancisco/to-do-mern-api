require('dotenv').config()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

class UserController {
  static createUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json('Please enter all fields required to create a user')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      password: hash,
      admin: false
    })
    newUser.save()
      .then(() => res.json({ msg: 'User added!' }))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static getUsers = (_req, res) => {
    User.find()
      .then(users =>
        users.length === 0
          ? res.status(404).json({ msg: 'No users found' })
          : res.json(users)
      )
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static getUser = (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ msg: 'User not found' })
        }
        return res.json(user)
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(400).json({ msg: 'User ID invalid', error: 'Error: ' + err })
        }
        return res.status(400).json('Error: ' + err)
      }
      )
  }

  static updateUser = async (req, res) => {
    if (!req.body.username || !req.body.password || !(typeof req.body.admin === 'boolean')) {
      return res.status(400).json('Please enter all fields required to update a user')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    User.findById(req.params.id)
      .then(user => {
        user.username = req.body.username
        user.password = hash
        user.admin = req.body.admin
        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err))
  }
}

module.exports = UserController
