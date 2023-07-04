const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  task: {
    type: String,
    maxlength: 100
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent', 'Critical'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true, versionKey: false })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
