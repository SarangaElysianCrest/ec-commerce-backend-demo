const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');
const Category = require('../system/category');
const SubCategory = require('../system/sub_category');
const Brand = require('../system/brand');
const ProductImages = require('../data/product-image');
const {ProductVariant} = require('../data/product-variant');

const Product = sequelize.define('data_product',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },

    sku:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    shortDescription: {
        type: DataTypes.STRING,
    },
    
    fullDescription: {
        type: DataTypes.TEXT
    },

    stock: {
        type: DataTypes.INTEGER,
    },

    price: {
        type: DataTypes.DOUBLE,
    },

    discount: {
        type: DataTypes.DOUBLE,
    },

    offerEnd: {
        type: DataTypes.DATE
    },

    new: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }



})


Product.belongsTo(Category,{
    as: 'category'
});
Product.belongsTo(SubCategory,{
    as: 'subCategory'
});
Product.belongsTo(Brand,{
    as: 'brand'
});
Product.hasMany(ProductImages,{
    as:'image'
});
Product.hasMany(ProductVariant,{as:'variation'})
module.exports = Product