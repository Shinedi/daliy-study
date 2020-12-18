const requireDirectory = require('require-directory')
const Router = require('koa-router')
class InitManger {
    static initCore(app){
        // 入口方法
        InitManger.loadConfig()
        InitManger.loadErrors()
        InitManger.initLoadRouters(app)
        
    }
    static loadErrors () {
        const errors = require('./http-exception')
        global.errs = errors
    }
    static loadConfig (path = '') {
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }
    static initLoadRouters(app){
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {visit: whenLoadModule})

        function whenLoadModule (obj) {
            if (obj instanceof Router) {
                console.log('haha')
                app.use(obj.routes())
            }
        }
    }
}
module.exports = InitManger