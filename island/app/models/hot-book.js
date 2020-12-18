const { sequelize } = require('../../core/db')
const bcrypt = require('bcryptjs')
const {Sequalize, Model, DataTypes, Op, Sequelize} = require('sequelize')
const {Favor} = require('./favor')

class HotBook extends Model{
    static async getAll(){
        const books = await HotBook.findAll({
            order: [
                'index'
            ]
        })
        const ids = [];
        books.forEach(book => {
            ids.push(book.id)
        })
        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids
                }
            },
            group: ['art_id'],
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
        return favors
        /* {
            art_id: [record1,record2],
            art_id2: [record3,record4]
        } */
    }
}

HotBook.init({
    index: DataTypes.INTEGER,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}