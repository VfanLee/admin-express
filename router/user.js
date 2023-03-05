const express = require('express')
const { login } = require('./handler/user')

const router = express.Router()

// 用户登录
router.post('/login', login)

module.exports = router
