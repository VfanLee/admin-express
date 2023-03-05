const jwt = require('jsonwebtoken')
const db = require('../../db')
const { jwtSecretKey } = require('../../config')

// 登录
module.exports.login = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.send({
      code: 0,
      message: '用户名或者密码不合法'
    })
  }

  db.query(
    `select * from user where username = '${username}'`,
    (err, result) => {
      if (err) {
        return res.send({
          code: 0,
          message: err.message
        })
      }

      if (result.length !== 1) {
        return res.send({
          code: 0,
          message: '用户名不存在'
        })
      }

      db.query(
        `select * from user where username = '${username}' and password = '${password}'`,
        (err, result) => {
          if (err) {
            return res.send({
              code: 0,
              message: err.message
            })
          }

          if (result.length !== 1) {
            return res.send({
              code: 0,
              message: '密码错误'
            })
          }

          // jwt payload 是不安全的，例如密码等重要信息不要传递
          const user = { ...result[0], password: '' }

          // 生成 jwt token
          const token = jwt.sign(user, jwtSecretKey, {
            expiresIn: 60 * 30 // 0.5h
          })

          // 【Bearer xxx】 jwt 规定写法
          res.send({
            code: 1,
            message: "登录成功",
            result: 'Bearer ' + token
          })
        }
      )
    }
  )
}
