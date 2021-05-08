const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  debugger
  if (user.username === 'fubodi' && user.password === 'fubodi111') {
    ctx.session.user = {  // koa-seesion会把这部分信息通过写到cookie里面去
      username: 'fubodi'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'fubodi'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
