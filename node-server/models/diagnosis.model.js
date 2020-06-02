/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/

module.exports = (sequelize, Sequelize) => {
  const Diagnosis = sequelize.define("diagnosis", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    diagnosisID: {
      type: Sequelize.STRING
    },
    diagnosisName: {
      type: Sequelize.STRING
    },
    assessment: {
      type: Sequelize.STRING
    },
    discontinue: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    },
    patientUUId: {
      type: Sequelize.STRING
    },
    recordChangedByUUID: {
      type: Sequelize.STRING
    },
    recordChangedOnDateTime: {
      type: Sequelize.DATE
    },
    recordChangedFromIPAddress: {
      type: Sequelize.STRING
    },
    
  });

  return Diagnosis;
};
