const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    get m () {
        return async (ctx, next) => {
            // nodejs ctx.req
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'
            console.log('usertoken', userToken)
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbidden()
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (e) {
                // token不合法
                // token过期
                if (e.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                } 
                throw new global.errs.Forbidden(errMsg)
            }
            if (decode.scope < this.level) {
                errMsg = '权限不足';
                throw new global.errs.Forbidden(errMsg)
            }
            // uid scope
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next();
            // token检测
            // token 开发者 传递令牌
            // token 可放在body、header
            // http规定身份验证机制HttpBasicAuth
        }
    }
    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (e) {
            return false
        }
    }
}
module.exports = {
    Auth
}