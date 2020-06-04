/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/
var Temporal = require('sequelize-temporal');

module.exports = (sequelize, Sequelize) => {
  const Recommendation = sequelize.define("doctorRecommendationsForPatient", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    uuidOfRecommendationMadeFor: {
      type: Sequelize.STRING
    },
    recommendationDescription: {
      type: Sequelize.STRING
    },
    priority: {
      type: Sequelize.INTEGER
    },
    recordChangedByUUID: {
      type: Sequelize.STRING
    },
    recordChangedOnDateTime: {
      type: Sequelize.STRING
    },
    recordChangedFromIPAddress: {
      type: Sequelize.STRING
    },
    isAutoRex: {
      type: Sequelize.INTEGER
    },
    autoRecommendationsOrderId: {
      type: Sequelize.STRING
    }
  });
  Temporal(Recommendation, sequelize)


  return Recommendation;
};
