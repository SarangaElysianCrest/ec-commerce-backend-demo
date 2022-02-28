const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');

const User = sequelize.define('user',{
    uid: {
        type: DataTypes.UUID,
        primaryKey: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    
    fName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    lName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },

    addressLine1:{
        type: DataTypes.STRING,
        allowNull: true
    },

    addressLine2: {
        type: DataTypes.STRING,
        allowNull: true
    },

    city: {
        type: DataTypes.STRING,
        allowNull: true
    },

})

module.exports = User;