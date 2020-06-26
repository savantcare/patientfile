const config = require("config");

const Sequelize = require("sequelize");
const reminderSequelize = new Sequelize(
  config.DB_REMINDER,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    port: config.DB_PORT,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

const reminderDB = {};

reminderDB.Sequelize = Sequelize;
reminderDB.sequelize = reminderSequelize;

reminderDB.reminders = require("../reminder.model.js")(
  reminderSequelize,
  Sequelize
);

reminderDB.sequelize.sync();

module.exports = reminderDB;
