const config = require('config');

const Sequelize = require("sequelize");
const screeningSequelize = new Sequelize(config.DB_SCREENING, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const screeningDB = {}

screeningDB.Sequelize = Sequelize
screeningDB.sequelize = screeningSequelize

screeningDB.screenings = require('../screening.model.js')(screeningSequelize, Sequelize)

screeningDB.sequelize.sync()//  This creates the table if it doesn't exist (and does nothing if it already exists)
// Ref: https://sequelize.org/master/manual/model-basics.html#model-synchronization

module.exports = screeningDB