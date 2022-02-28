const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');

const Order = sequelize.define('trans_order',{
    id:{
        type: DataTypes.UUID,
        primaryKey:true
    },

    uid:{
        type:DataTypes.UUID,
        allowNull:false
    },
    
    addressLine1:{
        type:DataTypes.STRING,
    },

    addressLine2:{
        type:DataTypes.STRING
    },

    city:{
        type:DataTypes.STRING
    },

    firstName:{
        type:DataTypes.STRING
    },
    lastName:{
        type:DataTypes.STRING
    },
    phone: {
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    orderTotal:{
        type: DataTypes.DOUBLE
    },
    currency:{
        type: DataTypes.STRING
    },
    rate:{
        type: DataTypes.DOUBLE
    }

})

const Item = sequelize.define('trans_order_items',{
    id:{
        type: DataTypes.UUID,
        primaryKey:true
    },
    sku: {
        type: DataTypes.STRING,
        allowNull:false
    },
    size:{
        type:DataTypes.STRING
    },
    color:{
        type: DataTypes.STRING
    },
    quantity:{
        type: DataTypes.STRING
    }

})

Order.hasMany(Item,{
    as:'items'
})

module.exports.Order = Order;
module.exports.Item = Item;