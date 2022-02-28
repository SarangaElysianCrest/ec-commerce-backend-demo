const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');
const Product = require('./product');


exports.ProductTag = sequelize.define('data_product_tag',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },


    tag: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
})

this.Tag.belongsTo(Product);