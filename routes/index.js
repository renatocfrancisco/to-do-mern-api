const rateLimit = require('express-rate-limit')
const { login, refresh, logout, auth } = require('../controllers/auth')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Max requests reached. Please try again later.'
})

const routes = (app) => {
  app.use(limiter)
  app.post('/login', login)
  app.get('/auth', auth)
  app.get('/refresh', refresh)
  app.get('/logout', logout)
}

module.exports = routes
