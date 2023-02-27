// 统一结果返回处理，一定要放在路由前面！
module.exports.resultHandler = (req, res, next) => {
  // 返回错误结果
  res.fail = function (message, code = 1) {
    res.send({
      code,
      message
    })
  }

  // 返回成功结果
  res.success = function (message, data, code = 0) {
    res.send({
      code,
      message,
      data
    })
  }

  next()
}

// 统一错误处理中间件，一定要放在路由后面！
module.exports.errorHandler = (err, req, res, next) => {
  // jwt 认证失败
  if (err.name === 'UnauthorizedError') {
    return res.fail(err.message)
  }

  // 未知错误
  res.fail(err.message)
}