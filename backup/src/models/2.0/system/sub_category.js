const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');
const Category = require('./category');

const SubCategory = sequelize.define('sys_sub_category',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true    
    },

    subCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

SubCategory.belongsTo(Category)

module.exports = SubCategory