const rateLimit = require('express-rate-limit')
const { login, refresh, logout } = require('../controllers/auth')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Max requests reached. Please try again later.'
})

const routes = (app) => {
  app.post('/login', limiter, login)
  app.get('/refresh', limiter, refresh)
  app.get('/logout', limiter, logout)
}

module.exports = routes
