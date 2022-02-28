const {DataTypes} = require('sequelize');

module.exports = function(sequelize) {
    sequelize.define('brand', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },

        brand: {
            type: DataTypes.STRING,
            allowNull:false
        }
    })
}