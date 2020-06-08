const config = require('config');

const Sequelize = require("sequelize");
const patientAppointmentSequelize = new Sequelize(config.DB_APPOINTMENT, config.USER, config.PASSWORD, {
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

const patientAppointment = {}

patientAppointment.Sequelize = Sequelize
patientAppointment.sequelize = patientAppointmentSequelize

patientAppointment.components = require('../patientAppointments.model.js')(patientAppointmentSequelize, Sequelize)


patientAppointment.sequelize.sync() // see doc at recommendation.database.js

module.exports = patientAppointment