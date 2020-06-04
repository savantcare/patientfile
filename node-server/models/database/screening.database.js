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

// master data tables
screeningDB.screensListMaster = require('../screening/screensListMaster.model.js')(screeningSequelize, Sequelize)
screeningDB.screenQuestionsMaster = require('../screening/screenQuestionsMaster.model.js')(screeningSequelize, Sequelize)
screeningDB.screenQuestionsMasterGroup = require('../screening/screenQuestionsMasterGroup.model.js')(screeningSequelize, Sequelize)
screeningDB.screenQuestionsMasterOptionTypes = require('../screening/screenQuestionsMasterOptionTypes.model.js')(screeningSequelize, Sequelize)

// user data tables
screeningDB.screenReportsOfPatient = require('../screening/screenReportsOfPatient.model.js')(screeningSequelize, Sequelize)
screeningDB.screenAnswerDetailsOfPatient = require('../screening/screenAnswerDetailsOfPatient.model.js')(screeningSequelize, Sequelize)
screeningDB.screensAssignedToPatient = require('../screening/screensAssignedToPatient.model.js')(screeningSequelize, Sequelize)

screeningDB.sequelize.sync()//  This creates the table if it doesn't exist (and does nothing if it already exists)
// Ref: https://sequelize.org/master/manual/model-basics.html#model-synchronization

module.exports = screeningDB