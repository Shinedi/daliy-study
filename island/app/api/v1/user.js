const Router = require('koa-router');
const {RegisterValidator} = require('../../validators/validator')
const {success} = require('../../lib/helper') // 成功返回值
const {User} = require('../../models/user')
const router = new Router({
    prefix: '/v1/user'
})

//
router.post('/register', async (ctx, next) => {
    // 思维路径
    // 接收参数LinValidator
    const v = await new RegisterValidator().validate(ctx)
    // email password
    // token jwt
    // token 无意义的随机字符串
    // jwt令牌可携带数据
    // uid jwt
    // 令牌获取 颁布令牌
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname'),
    }
    await User.create(user)
    success()
    
})

module.exports = router
