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
  },
  nickname: {
    type: String,
    default: '用户'
  },
  avatar: {
    type: String,
    default: "http://localhost:9090/avatar.jpg"
  }
})
// 表
module.exports = mongoose.model('user', UserSchema)
