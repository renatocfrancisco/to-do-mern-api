// Purpose: Admin middleware, checks if user.admin is true

const admin = (req, res, next) => {
  if (!req.user.admin) {
    return res.status(403).json({ msg: 'Access denied. Not an admin' })
  }
  next()
}

module.exports = admin
