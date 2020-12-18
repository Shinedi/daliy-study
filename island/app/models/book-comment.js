
const { sequelize } = require('../../core/db')
const bcrypt = require('bcryptjs')
const {Sequalize, Model, DataTypes} = require('sequelize')

class Comment extends Model {
    static async addComment(bookId, content){
        const comment = await Comment.findOne({
            where: {
                book_id:bookId,
                content 
            }
        })
        if (!comment) {
            return await Comment.create({
                book_id: bookId,
                content,
                nums: 1
            })
        } else {
            return await comment.increment('nums', {
                by:1
            })
        }
        // 点赞 +1
        // 你好酷 +1
    }

    // toJSON () {
    //     // this
    //     // this.dataValues可以获取所有属性
    //     return {
    //         content: this.getDataValue('content'),
    //         nums: this.getDataValue('nums')
    //     }
    // }
}

Comment.init({
    book_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    content: DataTypes.STRING(12),
    nums: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    sequelize,
    tableName: 'comment'
})

module.exports={
    Comment
}