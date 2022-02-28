const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');

const ProductVariant = sequelize.define('data_product_variant',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true
    },

    color: {
        type: DataTypes.STRING,
    },

    image: DataTypes.STRING

})



const VariantSize = sequelize.define('data_variant_size',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true
    },

    name: DataTypes.STRING,

    stock: DataTypes.INTEGER
}) 

ProductVariant.hasMany(VariantSize,{
    as:'size'
});

module.exports.ProductVariant = ProductVariant;
module.exports.VariantSize = VariantSize;