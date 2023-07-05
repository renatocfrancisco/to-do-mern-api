const jwt = require('../middlewares/jwt')
const router = require('express').Router()
const TaskController = require('../controllers/task')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: 'Max requests reached. Please try again later.'
})

router.use(jwt, limiter)

router.get('/', TaskController.getTasks)
router.get('/:id', TaskController.getTask)
router.post('/', TaskController.createTask)
router.put('/:id', TaskController.updateTask)
router.delete('/:id', TaskController.deleteTask)

module.exports = router
