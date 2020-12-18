const Router = require('koa-router');
const {TokenValidator, NotEmptyValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const {WXManger} = require('../../services/wx')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) =>  {
    const v = await new TokenValidator().validate(ctx)
    let token;
    // 业务逻辑
    // 1 在API接口编写
    // 2 model分层

    // 业务分层 Model, Sevice
    switch (v.get('body.type')) {
        case LoginType.USER_MAIL: 
            token = await emailLogin(v.get('body.account'),v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManger.codeToToken(v.get('body.account'))
            break;
        default: 
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

router.post('/verify', async (ctx) => {
    const v = await new NotEmptyValidator().validate(ctx);
    const result = Auth.verifyToken(v.get('body.token'))
    console.log('result',result)
    ctx.body = {
        is_valide: result
    }
})

async function emailLogin (account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = router