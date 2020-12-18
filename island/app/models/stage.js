const {PositiveIntegerValidator} = require('../validators/validator')
const {Flow} = require('../models/flow')
const {Art} = require('../models/art')
const {Favor} = require('../models/favor')
class Stage {
    static async queryNeighbor(ctx, flag = 0) {
        const v = await new PositiveIntegerValidator().validate(ctx, {
            id: 'index'
        })
        const index = v.get('path.index')
        const flow = await Flow.findOne({
            where: {
               index: index + flag
            }
        })
        if (!flow) {
            throw new global.errs.NotFound()
        } 
        const art = await Art.getData(flow.art_id, flow.type)
        const likeCurrent = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
        // art.dataValues.index = flow.index;
        art.setDataValue('index', flow.index)
        art.setDataValue('like_status', likeCurrent)
        return art;
    }
}
module.exports = {
    Stage
}