const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');

const Category = sequelize.define('sys_category',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },

    category: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Category