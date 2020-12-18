const { sequelize } = require('../../core/db')
const bcrypt = require('bcryptjs')
const {Sequalize, Model, DataTypes} = require('sequelize')

class User extends Model{
    static async verifyEmailPassword (email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        }) 
        if (!user) {
            throw new global.errs.AuthFailed('用户不存在')
        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user;
    }
    static async getUserByOpenid (openid){
        const user =  await User.findOne({
            where: {
                openid
            }
        }) 
        return user
    }
    static async registerByOpenid (openid){
        return await User.create({
            openid
        }) 
    }
}

User.init({
    // 主键: 不能重复，不能为空
    // 自增id编号
    // 数字查询性能最好
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: DataTypes.STRING,
    email: {
        type: DataTypes.STRING(128),
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: DataTypes.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}