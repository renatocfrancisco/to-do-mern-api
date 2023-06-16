const jwt = require('../middlewares/jwt')
const router = require('express').Router()
const TaskController = require('../controllers/task')

router.use(jwt)

router.get('/', TaskController.getTasks)
router.get('/:id', TaskController.getTask)
router.post('/', TaskController.createTask)
router.put('/:id', TaskController.updateTask)
router.delete('/:id', TaskController.deleteTask)

module.exports = router
