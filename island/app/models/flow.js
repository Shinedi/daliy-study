const { sequelize } = require('../../core/db')
const {Sequalize, Model, DataTypes} = require('sequelize')

class Flow extends Model {

}

Flow.init({
    index: DataTypes.INTEGER, // 序号
    art_id: DataTypes.INTEGER, // 实体id号
    type: DataTypes.INTEGER, // 对应实体表中的哪一个： 100 movie 300 sentence 200 music
}, {
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}