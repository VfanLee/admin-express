// 统一错误处理中间件，一定要放在路由后面！
module.exports.errorHandler = (err, req, res, next) => {
  // jwt 认证失败
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send(err.message)
  }

  // 未知错误
  res.fail(err.message)
}