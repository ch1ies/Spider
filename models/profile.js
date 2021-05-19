const sequelize = require('./db')
const { DataTypes } = require('sequelize')

// 定义模型

module.exports = sequelize.define("Profile", {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
})