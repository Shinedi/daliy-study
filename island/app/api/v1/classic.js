const Router = require('koa-router')
const {HttpException, ParameterException} = require('../../../core/http-exception')
const {PositiveIntegerValidator, ClassicValidator} = require('../../validators/validator')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
const {Stage} = require('../../models/stage')
const {Favor} = require('../../models/favor')
const router = new Router({
    prefix: '/v1/classic'
})

const {Auth} = require('../../../middlewares/auth')
const art = require('../../models/art')

router.get('/latest', new Auth(1).m, async (ctx, next)=>{
    // 限制 权限
    // 普通用户 管理员
    // 分级 scope
    // 8 16

    // ctx.body = ctx.auth.uid;
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    // 返回的是一个类，传回客户端的是art.dataValues
    const art = await Art.getData(flow.art_id, flow.type)
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    // art.dataValues.index = flow.index;
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)
    ctx.body = art;
    // 序列化 对象 json
    // const path = ctx.params;
    // const query = ctx.request.query;
    // const headers = ctx.request.header;
    // const body = ctx.request.body;
    // ctx.body = new ParameterException()
    // const v = await new PositiveIntegerValidator().validate(ctx);
    // const id = path.id
    // console.log('id', id)
    // ctx.body = 'success'

    
})

router.get('/:index/next', new Auth(1).m, async (ctx) => {
    const art = await Stage.queryNeighbor(ctx, 1);
    ctx.body = art;
})

router.get('/:index/previous', new Auth(1).m, async (ctx) => {
    const art = await Stage.queryNeighbor(ctx, -1);
    ctx.body = art;
})

router.get('/:type/:id', new Auth(1).m, async (ctx) => {
    const v = await new ClassicValidator().validate(ctx);
    const id = v.get('path.id');
    const type = parseInt(v.get('path.type'))
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid);
    artDetail.art.setDataValue('like_status', artDetail.like_status )
    ctx.body = artDetail.art
})

router.get('/:type/:id/favor', new Auth(1).m, async (ctx) => {
    const v = await new ClassicValidator().validate(ctx);
    const id = v.get('path.id');
    const type = parseInt(v.get('path.type'))
    // const art = await Art.getData(id, type)
    // if (!art) {
    //     throw new global.errs.NotFound()
    // }
    // const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid);
    ctx.body = {
        fav_nums: artDetail.art.fav_nums,
        like_status: artDetail.like_status
    }
})

router.get('/favor', new Auth(1).m, async ctx => {
    const uid = ctx.auth.uid;
    console.log('___uid', uid)
    ctx.body = await Favor.getMyClassicFavors(uid)
})

module.exports = router
