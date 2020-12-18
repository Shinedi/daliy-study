const { unset, clone } = require('lodash');
const {Sequelize, Model} = require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database;
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updatedAt', 'deletedAt', 'createdAt']
                }
            }
        }
    }
})

sequelize.sync()

Model.prototype.toJSON = function(){
    let data = clone(this.dataValues);
    unset(data, 'updatedAt')
    unset(data, 'createdAt')
    unset(data, 'deletedAt')
    return data;
}

module.exports = {
    sequelize
}