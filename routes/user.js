const jwt = require('../middlewares/jwt')
const admin = require('../middlewares/admin')
const router = require('express').Router()
const UserController = require('../controllers/user')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: 'Max requests reached. Please try again later.'
})

router.use(limiter)

router.get('/', jwt, admin, UserController.getUsers)
router.get('/:id', jwt, admin, UserController.getUser)
router.post('/', UserController.createUser)
router.put('/:id', jwt, admin, UserController.updateUser)
router.delete('/:id', jwt, admin, UserController.deleteUser)

module.exports = router
