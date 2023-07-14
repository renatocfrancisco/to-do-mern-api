require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

class AuthController {
  static login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json('Please enter all fields required to login')
    }

    const foundUser = await User.findOne({ username: { $eq: username } })
    const validPass = foundUser ? await bcrypt.compare(password, foundUser.password) : false
    if (!foundUser || !validPass) {
      return res.status(400).json('Invalid login credentials')
    }

    const accessToken = jwt.sign({ _id: foundUser._id, admin: foundUser.admin }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ _id: foundUser._id, admin: foundUser.admin }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' })

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({ accessToken, refreshToken })
  }

  static refresh = async (req, res) => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      return res.status(400).json({ msg: 'User not logged in' })
    }

    try {
      const verified = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      const accessToken = jwt.sign({ _id: verified._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      res.json({ accessToken })
    } catch (err) {
      res.status(400).json({ msg: 'Invalid token' })
    }

    function getRefreshToken () {
      if (!req.headers.cookie) {
        if (!req.headers.cookies) {
          return null
        } else {
          return req.headers.cookies.split('jwt=')[1].split(';')[0].trim()
        }
      } else {
        const cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
        if (!cookie) {
          return null
        }
        return cookie.split('=')[1]
      }
    }
  }

  static logout = async (_req, res) => {
    res.clearCookie('jwt')
    res.status(204).json('User logged out')
  }
}

module.exports = AuthController
