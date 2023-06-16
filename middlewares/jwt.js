const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const header = req.headers.authorization
  const token = header && header.split(' ')[1]

  if (!token) {
    return res.status(401).json({ msg: 'Access denied. User must be logged on.' })
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' })
  }
}

module.exports = auth
