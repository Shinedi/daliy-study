const Koa = require('koa')

const staticRouter = require('./routers/static') // 为了解决静态文件访问不到的问题
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDb = require('./db/db')
const config = require('../app.config')
const koaBody = require('koa-body') // 处理请求体body内容
const koaSession = require('koa-session') // 处理请求体body内容

const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()

app.keys = ['vue ssr tech'] // 用来加密seesion
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2*60*60*1000 // 2h过期
}, app))

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`request path ${ctx.path}`)
    await next()
  } catch(e) {
    console.log(e)
    ctx.status = 500
    if (isDev) {
      ctx.body = e.message
    } else {
      ctx.body = `please try again later`
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(koaBody())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(staticRouter.allowedMethods())
app.use(userRouter.routes()).use(staticRouter.allowedMethods())
let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods()) // koa的既定用法，不需要关心
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})


