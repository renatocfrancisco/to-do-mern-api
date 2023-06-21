const Task = require('../models/task')

class TaskController {
  static createTask = async (req, res) => {
    const { task, description, priority } = req.body
    if (!task) {
      return res.status(400).json('Please enter all fields required to create a task')
    }

    if (priority) {
      if (!checkPriority(priority)) {
        return res.status(400).json('Priority must be either: Low, Medium, High, Urgent, Critical')
      }
    }

    const data = {
      user: req.user._id,
      task,
      description: description || '',
      priority: priority || 'Low',
    }

    const newTask = new Task(data)

    newTask.save()
      .then(() => res.status(201).json('Task added!'))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static getTasks = async (req, res) => {
    Task.find({ user: req.user._id })
      .then(tasks =>
        tasks.length === 0
          ? res.status(404).json({ msg: 'No tasks found. Get busy!' })
          : res.json(tasks)
      )
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static getTask = async (req, res) => {
    Task.find({ _id: req.params.id, user: req.user._id })
      .then(task => res.json(task))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static updateTask = async (req, res) => {
    const { task, description, priority, status } = req.body
    const taskName = task
    if (!taskName || !priority || !status) {
      return res.status(400).json('Please enter all fields required to update a task')
    }

    if (!checkPriority(priority)) {
      return res.status(400).json('Priority must be either: Low, Medium, High, Urgent, Critical')
    }

    if (!checkStatus(status)) {
      return res.status(400).json('Status must be either: Pending, In Progress, Completed, On Hold, Cancelled')
    }

    const data = {
      task: taskName,
      description: description || '',
      priority,
      status
    }

    Task.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { $set: data }, { new: true })
      .then(task => res.json({ msg: 'Task updated!', task }))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static deleteTask = (req, res) => {
    Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json('Error: ' + err))
  }
}

function checkPriority (priority) {
  return ['Low', 'Medium', 'High', 'Urgent', 'Critical'].includes(priority)
}

function checkStatus (status) {
  return ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].includes(status)
}

module.exports = TaskController
