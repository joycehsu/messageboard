const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
// const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const path = require('path')

const signup = require('./routes/v1/account/signup')
const login = require('./routes/v1/account/login')
const logout = require('./routes/v1/account/logout')
const profile = require('./routes/v1/account/profile')
const message = require('./routes/v1/message/index')
const responseHandler = require('./middlewares/response')
const RequestValueCheck = require('./middlewares/reqval_check')
global.appRoot = path.resolve(__dirname)

// error handler
// onerror(app)
app.use(responseHandler.errorHandler)

// middlewares
app.use(koaBody({
  multipart:true,
  formidable: {
    maxFieldsSize: 1024*1024/10
  }
}))
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(RequestValueCheck)

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(signup.routes(), signup.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(logout.routes(), logout.allowedMethods())
app.use(profile.routes(), profile.allowedMethods())
app.use(message.routes(), message.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.use(responseHandler.normalHandler)

module.exports = app
