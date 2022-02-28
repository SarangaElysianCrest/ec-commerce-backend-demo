const {DataTypes} = require('sequelize');
const {sequelize} = require('../../../index');

const Brand = sequelize.define('sys_brand', {
  id: {
      type: DataTypes.UUID,
      primaryKey: true
  },

  brand: {
      type: DataTypes.STRING,
      allowNull:false
  }
})

module.exports = Brand