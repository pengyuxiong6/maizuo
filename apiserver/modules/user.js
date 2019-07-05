// 数据库model文件
const mongoose = require('mongoose')

// schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
// 表
module.exports = mongoose.model('user', UserSchema)
