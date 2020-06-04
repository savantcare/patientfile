/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/

module.exports = (sequelize, Sequelize) => {
    const screenReportsOfPatient = sequelize.define("screenReportsOfPatient", {
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      screenID: {
        type: Sequelize.INTEGER
      },
      isWorkingOrSubmittedStatus: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      patientUUID: {
        type: Sequelize.STRING
      },
      recordChangedByUUID: {
        type: Sequelize.STRING
      },
      recordChangedOnDateTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      recordChangedFromIPAddress: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      recordChangedFromSection: {
        type: Sequelize.STRING,
        defaultValue: 'patientFile'
      }
    });
  
    return screenReportsOfPatient;
  };
  