const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('database', 'root', 'xiaoyezi', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize