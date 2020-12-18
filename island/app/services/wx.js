const axios = require('axios')
const util = require('util') // nodejs提供的
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')
class WXManger {
    static async codeToToken(code) {
        // code码 小程序生成
        // openid 唯一标识（依靠wx鉴定是否合法）

        // 显示注册
        // 唯一标识
        // code 
        // appid appserect
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code
            )
        console.log('url',url)
        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode;
        const errmsg = result.data.errmsg
        if (errcode) {
            throw new global.errs.AuthFailed('openid获取失败:' + errmsg)
        }
        // openid 
        // 档案 user uid
        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManger
}