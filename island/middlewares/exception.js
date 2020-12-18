const {HttpException} = require('../core/http-exception')
const cacheError = async (ctx, next) => {
    try {
        await next()
    }catch(error) {
        console.log('#######', JSON.stringify(error))
        if (global.config.environment == 'dev') {
            console.log('lllllllll')
            // throw error
        }
        // 监听错误，输出一段有意义的信息
        if (error instanceof HttpException) {
            console.log('999999999')
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            console.log('999999999')
            ctx.body = {
                msg: 'we made a mistake',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    
        
    }
}
module.exports = cacheError