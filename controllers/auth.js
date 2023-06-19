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
    const validPass = foundUser ? await bcrypt.compare(password, foundUser.password) : false
    if (!foundUser || !validPass) {
      return res.status(400).json('Invalid login credentials')
    }

    const sessionUser = req.session.user
    if (sessionUser) {
      const fingerprint = await generateFingerprint(req)
      if (sessionUser.fingerprint !== fingerprint) {
        return res.status(403).json({ msg: 'Access blocked from this device.' });
      }else{
        return res.status(200).json({ msg: 'User already logged in' })
      }
    }

    const accessToken = jwt.sign({ _id: foundUser._id, admin: foundUser.admin }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ _id: foundUser._id, admin: foundUser.admin }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' })

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    req.session.user = {
      authenticated: true,
      userAgent: req.headers['user-agent'],
      sessionId: req.sessionID,
      ip: req.ip,
      fingerprint: await generateFingerprint()
    }
    console.log('Session:', req.session)
    res.json({ accessToken, refreshToken })

    function generateFingerprint(req) {
      const { useragent, ip } = req;
      const deviceInfo = device(useragent);
    
      // You can customize the fingerprint generation based on the device properties
      const fingerprint = `${deviceInfo.type}-${deviceInfo.os}-${deviceInfo.browser}-${ip}`;
      return fingerprint;
    }
  }

  static auth = (req, res) => {
    if(!req.session.user){
      return res.status(401).json({ msg: 'User not logged in' })
    }
    const { authenticated, userAgent, sessionId, ip, fingerprint } = req.session.user
    res.send({ authenticated: !!authenticated, userAgent, sessionId, ip, fingerprint })
  }

  static refresh = async (req, res) => {
    // separate connect.sid and jwt cookies
    const refreshToken = req.headers.cookie.split(';')[1].split('=')[1]
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
    res.clearCookie('jwt')
    res.clearCookie('connect.sid')
    res.json({ msg: 'User logged out' })
  }
}

module.exports = AuthController
