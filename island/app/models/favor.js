const { sequelize } = require('../../core/db')
const bcrypt = require('bcryptjs')
const {Sequalize, Model, DataTypes, Op} = require('sequelize')
const {Art} = require('./art')

class Favor extends Model {
    // 业务表
    static async like(art_id, type, uid) {
        // 1 favor中添加记录
        // 2 classic(movie, sentence, music)实体表中添加记录
        // 数据库事务 保证数据一致性,上面这2步操作能成功执行(和promise.all原理差不多)
        // 数据库设计原则： 
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        console.log('____favor', favor)
        if (favor) {
           
            throw new global.errs.LikeError()
        }
        return sequelize.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            }, {transaction: t})
            const art = await Art.getData(art_id, type, false)
            await art.increment('fav_nums', {by: 1, transaction: t})
        })
    }
    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.DisLikeError()
        }
        // Favor 表 favor 记录
        return sequelize.transaction(async t => {
            await favor.destroy({
                force: false, // 软删除（还在表里,deletedAt有删除时间）
                transaction: t
            })
            const art = await Art.getData(art_id, type, false)
            await art.decrement('fav_nums', {by: 1, transaction: t})
        })
    }

    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        return favor ? true : false
    }
    // 查询喜欢的期刊
    static async getMyClassicFavors (uid) {
        const arts = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (!arts) {
            throw new global.errs.NotFound()
        }
        // arts 100 循环查询数据，查询数据库次数不可控
        // for (let art of arts) {

        // }
        return await Art.getList(arts)
    }
    static async getBookFavor(uid, bookId) {
        const favorNums = await Favor.count({
            where: {
                art_id: bookId,
                type: 400
            }
        })
        const myFavor = await Favor.findOne({
            where: {
                art_id: bookId,
                type: 400,
                uid
            }
        })
        return {
            fav_nums: favorNums,
            like_status: myFavor ? 1:0
        };
    }
}

Favor.init({
    uid: DataTypes.INTEGER,
    art_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}
