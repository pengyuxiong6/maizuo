/* eslint-disable */
const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/maizuo';
const userController = require('./controllers/user')
//创建erpress实例
const server = express()

//连接数据库
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('database is connnected 👌')
  })
  .catch(error => {
    console.log('failure')
  });

// 中间件的使用和配置
server.use(express.json());
server.use(express.urlencoded({ extended: false }))
server.use(express.static('public'))
server.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Headers", "content-type")
  next()
})

//路由设置

server.post('/register', userController.postRegister) //注册
server.post('/login', userController.postLogin) //登录


server.listen(9090)
