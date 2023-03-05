const db = require('../../db')

// 获取用户信息
module.exports.getInfo = (req, res) => {
  // express-jwt 解析时自动挂载的
  const payload = req.auth

  db.query(
    `select id, username, avatar, roles from user where id = ${payload.id}`,
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
          message: '获取用户信息失败'
        })
      }

      const data = {
        id: result[0].id,
        username: result[0].username,
        avatar: result[0].avatar,
        role: result[0].roles
      }

      res.send({
        code: 1,
        message: '成功',
        result: data
      })
    }
  )
}
