const db = require('../../db')

// 获取用户信息
module.exports.getInfo = (req, res) => {
  // express-jwt 解析时自动挂载的
  const payload = req.auth

  db.query(
    `select id, username from user where id = ${payload.id}`,
    (err, result) => {
      if (err) {
        return res.fail(err.message)
      }

      if (result.length !== 1) {
        return res.fail('获取用户信息失败')
      }

      const data = {
        id: result[0].id,
        username: result[0].username,
        avatar: 'https://avatars.githubusercontent.com/u/62793687',
        permission: [],
        role: []
      }

      res.success('成功', data)
    }
  )
}

// 修改密码
module.exports.updatePassword = (req, res) => {
  const { id, password } = req.body

  if (password === '') {
    return res.fail('密码格式不正确')
  }

  db.query(
    `update user password set password = '${password}' where id = ${id}`,
    (err, result) => {
      if (err) {
        return res.fail(err.message)
      }

      if (result.affectedRows !== 1) {
        return res.fail('修改密码失败')
      }

      res.success('修改密码成功')
    }
  )
}
