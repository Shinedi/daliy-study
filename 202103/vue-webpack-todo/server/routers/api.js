const Router = require('koa-router')

const apiRouter = new Router({prefix: '/api'}) // 只处理/api开头的路径

const successResponse = data => {
  return {
    success: true,
    data
  }
}

const validateUser = async (ctx, next)=> {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'not login'
  } else {
    await next()
  }
}

apiRouter.use(validateUser)

apiRouter.get('/todos', async (ctx) => {
  const todos = await ctx.db.getAllTodos()
  ctx.body = successResponse(todos)
})
.post('/todo', async (ctx) => {
  const data = await ctx.db.addTodo(ctx.request.body)
  ctx.body = successResponse(data)
})
.put('/todo/:id', async (ctx) => {
  const data = await ctx.db.updataTodo(ctx.params.id, ctx.request.body)
  ctx.body = successResponse(data)
})
.delete('/todo/:id', async (ctx) => {
  const data = await ctx.db.deleteTodo(ctx.params.id)
  ctx.body = successResponse(data)
})
.post('/delete/completed', async (ctx) => { // 接口
  const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
  ctx.body = successResponse(data)
})

module.exports = apiRouter
