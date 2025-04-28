const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prova_jk_mvc', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
