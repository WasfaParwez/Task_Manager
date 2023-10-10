const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  task: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', taskSchema);


