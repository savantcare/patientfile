const config = require('config');

const Sequelize = require("sequelize");
const mentalStatusExamSequelize = new Sequelize(config.DB_MENTAL_STATUS_EXAM, config.USER, config.PASSWORD, {
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

const mentalStatusExam = {}

mentalStatusExam.Sequelize = Sequelize
mentalStatusExam.sequelize = mentalStatusExamSequelize

mentalStatusExam.appearence = require('../mentalStatusExam/appearence.model')(mentalStatusExamSequelize, Sequelize)
mentalStatusExam.attitude = require('../mentalStatusExam/attitude.model')(mentalStatusExamSequelize, Sequelize)
mentalStatusExam.cognition = require('../mentalStatusExam/cognition.model')(mentalStatusExamSequelize, Sequelize)
mentalStatusExam.constitutional = require('../mentalStatusExam/constitutional.model')(mentalStatusExamSequelize, Sequelize)
mentalStatusExam.eyeContact = require('../mentalStatusExam/eyeContact.model')(mentalStatusExamSequelize, Sequelize)
mentalStatusExam.impulseControl = require('../mentalStatusExam/impulseControl.model')(mentalStatusExamSequelize, Sequelize)

mentalStatusExam.sequelize.sync()

module.exports = mentalStatusExam