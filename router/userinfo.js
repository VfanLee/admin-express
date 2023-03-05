const express = require('express')
const { getInfo } = require('./handler/userinfo')

const router = express.Router()

// 获取用户信息
router.get('/info', getInfo)

module.exports = router
