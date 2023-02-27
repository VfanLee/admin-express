const jwt = require('jsonwebtoken')
const db = require('../../db')
const { jwtSecretKey } = require('../../config')

// 注册
module.exports.register = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.fail('用户名或者密码不合法')
  }

  db.query(
    `select username from user where username = '${username}'`,
    (err, result) => {
      if (err) {
        return res.fail(err.message)
      }

      if (result.length > 0) {
        return res.fail('用户已存在')
      }

      db.query(
        `insert into user (username, password) values ('${username}', '${password}')`,
        (err, result) => {
          if (err) {
            return res.fail(err.message)
          }

          if (result.affectedRows !== 1) {
            return res.fail('注册失败')
          }

          res.success('注册成功')
        }
      )
    }
  )
}

// 登录
module.exports.login = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.fail('用户名或者密码不合法')
  }

  db.query(
    `select * from user where username = '${username}'`,
    (err, result) => {
      if (err) {
        return res.fail(err.message)
      }

      if (result.length !== 1) {
        return res.fail('用户名不存在')
      }

      db.query(
        `select * from user where username = '${username}' and password = '${password}'`,
        (err, result) => {
          if (err) {
            return res.fail(err.message)
          }

          if (result.length !== 1) {
            return res.fail('密码错误')
          }

          // jwt payload 是不安全的，例如密码等重要信息不要传递
          const user = { ...result[0], password: '' }

          // 生成 jwt token
          const token = jwt.sign(user, jwtSecretKey, {
            expiresIn: '8h'
          })

          // 【Bearer xxx】 规定写法
          res.success('登陆成功', 'Bearer ' + token)
        }
      )
    }
  )
}
