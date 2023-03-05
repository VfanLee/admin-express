const express = require('express')
const cors = require('cors')
const { expressjwt } = require('express-jwt')
const { port, jwtSecretKey } = require('./config')
const { errorHandler } = require('./middleware')
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// jwt 解析
app.use(
  expressjwt({
    secret: jwtSecretKey,
    algorithms: ['HS256']
  }).unless({
    path: [/^\/api/]
  })
)
app.get('/', (req, res) => {
  res.send('ok')
})
app.use('/api', userRouter)
app.use('/user', userinfoRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
