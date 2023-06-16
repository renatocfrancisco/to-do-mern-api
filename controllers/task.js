const Task = require('../models/task')
const User = require('../models/user')

class TaskController {
  static createTask = async (req, res) => {
    const { task, description, priority, status } = req.body
    if (!task || !description) {
      return res.status(400).json('Please enter all fields required to create a task')
    }
    if (priority) {
      if (!checkPriority(priority)) {
        return res.status(400).json('Status must be either: Pending, In Progress, Completed, On Hold, Cancelled')
      }
    }

    if (status) {
      if (!checkStatus(status)) {
        return res.status(400).json('Priority must be either: Low, Medium, High, Urgent, Critical')
      }
    }

    const foundUser = await User.findOne({})

    if (!foundUser._id) {
      return res.status(400).json('User ID does not exist')
    }

    const newTask = new Task({
      user: foundUser._id,
      task,
      description
    })

    newTask.save()
      .then(() => res.json({ msg: 'Task added!' }))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static getTasks = async (req, res) => {
    const foundUser = await User.findOne({})
    Task.find({ user: foundUser._id })
      .then(tasks =>
        tasks.length === 0
          ? res.status(404).json({ msg: 'No tasks found. Get busy!' })
          : res.json(tasks)
      )
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static getTask = async (req, res) => {
    Task.findById(req.params.id)
      .then(task => res.json(task))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static updateTask = async (req, res) => {
    if (!req.body.task || !req.body.description) {
      return res.status(400).json('Please enter all fields required to update a task')
    }

    if (!checkPriority(req.body.priority)) {
      return res.status(400).json('Status must be either: Pending, In Progress, Completed, On Hold, Cancelled')
    }
    if (!checkStatus(req.body.status)) {
      return res.status(400).json('Priority must be either: Low, Medium, High, Urgent, Critical')
    }

    Task.findById(req.params.id)
      .then(task => {
        task.task = req.body.task
        task.description = req.body.description
        task.priority = req.body.priority
        task.status = req.body.status

        task.save()
          .then(() => res.json('Task updated!'))
          .catch(err => res.status(400).json('Error: ' + err))
      }).catch(err => res.status(400).json('Error: ' + err))
  }

  static deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json('Error: ' + err))
  }
}

function checkPriority (priority) {
  return !!['Low', 'Medium', 'High', 'Urgent', 'Critical'].includes(priority)
}

function checkStatus (status) {
  return !!['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].includes(status)
}

module.exports = TaskController
