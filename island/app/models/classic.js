const { sequelize } = require('../../core/db')
const bcrypt = require('bcryptjs')
const {Sequalize, Model, DataTypes} = require('sequelize')

const classicFields = {
    image: DataTypes.STRING,
    content: DataTypes.STRING,
    pubdate: DataTypes.DATEONLY,
    fav_nums: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    title: DataTypes.STRING,
    type: DataTypes.TINYINT
}

class Movie extends Model{

}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

class Sentence extends Model{

}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})

class Music extends Model{

}

const musicfields = Object.assign({
    url: DataTypes.STRING
}, classicFields)

Music.init(musicfields, {
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}