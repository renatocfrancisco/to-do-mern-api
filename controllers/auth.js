require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

class AuthController {
  static login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json('Please enter all fields required to login')
    }

    const foundUser = await User.findOne({ username })
    const validPass = await bcrypt.compare(password, foundUser.password)
    if (!foundUser || !validPass) {
      return res.status(400).json('Invalid login credentials')
    }

    const accessToken = jwt.sign({ _id: foundUser._id, admin: foundUser.admin }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ _id: foundUser._id, admin: foundUser.admin }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' })

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({ accessToken, refreshToken })
  }

  static refresh = async (req, res) => {
    console.log(req.cookies)
    console.log(req.headers.cookie)
    const refreshToken = req.headers.cookie.split('=')[1]
    if (!refreshToken) {
      return res.status(401).json({ msg: 'User not logged in' })
    }

    try {
      const verified = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      const accessToken = jwt.sign({ _id: verified._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      res.json({ accessToken })
    } catch (err) {
      res.status(400).json({ msg: 'Invalid token' })
    }
  }

  static logout = async (_req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.json({ msg: 'User logged out' })
  }
}

module.exports = AuthController