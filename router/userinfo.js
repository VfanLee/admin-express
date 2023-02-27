const express = require('express')
const { getInfo, updatePassword } = require('./handler/userinfo')

const router = express.Router()

// 获取用户信息
router.get('/info', getInfo)

// 修改用户密码
router.put('/password', updatePassword)

module.exports = router
