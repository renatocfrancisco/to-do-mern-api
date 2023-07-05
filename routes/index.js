const rateLimit = require('express-rate-limit')
const { login, refresh, logout } = require('../controllers/auth')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: 'Max requests reached. Please try again later.'
})

const routes = (app) => {
  app.post('/login', limiter, login)
  app.get('/refresh', limiter, refresh)
  app.get('/logout', limiter, logout)
}

module.exports = routes
