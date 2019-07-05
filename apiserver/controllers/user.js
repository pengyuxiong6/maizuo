const UserModel = require('../modules/user')

// register
const postRegister = (req, res) => {
  const user = new UserModel(req.body)
  user.save().then(() => {
    res.send({
      code: 0,
      msg: 'ok'
    })
  }).catch(error => {
    res.send({
      code: -1,
      msg: error.message
    })
  })
}

const postLogin = (req, res) => {
  UserModel.findOne(req.body)
    .then(data => {
      if (data) {
        res.send({
          code: 0,
          msg: 'ok',
          data: {
            username: data.username,
            nickname: data.nickname,
            avatar: data.avatar
          }
        })
      } else {
        res.send({
          code: -1,
          msg: '用户名或密码错误'
        })
      }
    })
    .catch(error => {
      res.send({
        code: -1,
        msg: error.message
      })
    })
}

module.exports = {
  postRegister,
  postLogin
}
