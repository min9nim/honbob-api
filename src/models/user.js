const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  ip: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },

})

module.exports = mongoose.model('User', schema, 'users')
