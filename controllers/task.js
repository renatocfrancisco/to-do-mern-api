const Task = require('../models/task')

class TaskController {
  static createTask = async (req, res) => {
    const { task, priority } = req.body
    if (!task || typeof task !== 'string') {
      return res.status(400).json('Please enter a name for the task')
    }

    if (priority) {
      if (!checkPriority(priority)) {
        return res.status(400).json('Priority must be either: Low, Medium, High, Urgent, Critical')
      }
    }

    const data = {
      user: req.user._id,
      task,
      priority: priority || 'Low'
    }

    const newTask = new Task(data)

    newTask.save()
      .then(() => res.status(201).json({ msg: 'Task added!', task: newTask }))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static getTasks = async (req, res) => {
    Task.find({ user: { $eq: req.user._id } })
      .then(tasks =>
        tasks.length === 0
          ? res.status(404).json({ msg: 'No tasks found. Get busy!' })
          : res.json(tasks)
      )
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static getTask = async (req, res) => {
    Task.find({ _id: { $eq: req.params.id }, user: { $eq: req.user._id } })
      .then(task => res.json(task))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static updateTask = async (req, res) => {
    const { task, priority, status } = req.body
    const updateObj = {}

    if (!task && !priority && !status) {
      return res.status(400).json('At least one field is required to update a task')
    }

    if (status) {
      if (!checkStatus(status)) {
        return res.status(400).json('Status must be either: Pending, In Progress, Completed, On Hold, Cancelled')
      }
      updateObj.status = status
    }

    if (priority) {
      if (!checkPriority(priority)) {
        return res.status(400).json('Priority must be either: Low, Medium, High, Urgent, Critical')
      }
      updateObj.priority = priority
    }

    if (task && typeof task === 'string') {
      updateObj.task = task
    }

    if (updateObj === {}) {
      return res.status(400).json('No valid fields to update')
    }

    Task.findOneAndUpdate({ _id: { $eq: req.params.id }, user: { $eq: req.user._id } }, { $set: updateObj }, { new: true })
      .then(task => {
        if (!task) {
          return res.status(404).json('Task not found')
        }
        res.status(200).json({ msg: 'Task updated!', task })
      })
      .catch(err => res.status(400).json('Error: ' + err))
  }

  static deleteTask = (req, res) => {
    Task.findOneAndDelete({ _id: { $eq: req.params.id }, user: { $eq: req.user._id } })
      .then(() => res.json('Task deleted.'))
      .catch(err => {
        if(err.name === 'CastError') return res.status(400).json('Invalid ID Error: ' + err)
        res.status(400).json('Error: ' + err)
      })
  }
}

function checkPriority (priority) {
  return ['Low', 'Medium', 'High', 'Urgent', 'Critical'].includes(priority)
}

function checkStatus (status) {
  return ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].includes(status)
}

module.exports = TaskController
