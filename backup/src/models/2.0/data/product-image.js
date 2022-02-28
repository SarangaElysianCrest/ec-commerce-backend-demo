const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');
const Product = require('./product');

const ProductImage = sequelize.define('data_product_image',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
})


module.exports = ProductImage