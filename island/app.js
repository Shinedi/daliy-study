const Koa = require('koa');
const parser = require('koa-bodyparser')
const InitManger = require('./core/init')
const catchError = require('./middlewares/exception.js')
const static = require('koa-static')
const path = require('path')



const app = new Koa()
app.use(parser())
app.use(catchError)
app.use(static(path.join(__dirname, './static')))
InitManger.initCore(app)


// 注册
// app.use(book.routes())
// app.use(classic.routes())  


// app.use(async (ctx, next)=> {
//     console.log(ctx.path)
//     console.log(ctx.method)
//     if (ctx.path == '/classic/latest' && ctx.method == 'GET') {
//         ctx.body = {
//             key: 'classic'
//         }
//     }
// })

app.listen(3000)
