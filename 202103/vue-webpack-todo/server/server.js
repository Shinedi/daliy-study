const Koa = require('koa')

const staticRouter = require('./routers/static') // 为了解决静态文件访问不到的问题

const app = new Koa()

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

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
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


