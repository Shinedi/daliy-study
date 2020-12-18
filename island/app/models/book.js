const axios = require('axios')
const { sequelize } = require('../../core/db')
const bcrypt = require('bcryptjs')
const {Sequalize, Model, DataTypes} = require('sequelize')
const util = require('util');
const { Favor } = require('./favor');


class Book extends Model {
    constructor (id) {
        super()
        this.id = id
    }
   async detail() {
        const url = util.format(global.config.yushu.detailUrl, this.id);
        const detail = await axios.get(url)
        return detail.data
    }
    static async searchFromYushu(q, start, count, summary = 1) {
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, summary);
        console.log('___url', url)
        const result = await axios.get(url)
        return result.data
    }
    static async getMyFavorBookCount(uid) {
        const count = await Favor.count({
            where: {
                type: 400,
                uid
            }
        })
        return count;
    }
    
}

Book.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    Book
}