module.exports = {
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345678'
    },
    security: {
        secretKey: 'abcdefg',
        expiresIn: 60*60*24*30
    },
    wx: {
        appId: 'wx2ef9a09eea5543d3',
        appSecret: '370bee4ba1c236d3420253c81728d351',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
}