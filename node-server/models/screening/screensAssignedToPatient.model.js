/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/

module.exports = (sequelize, Sequelize) => {
    const screensAssignedToPatient = sequelize.define("screensAssignedToPatient", {
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      screenID: {
        type: Sequelize.INTEGER
      },
      patientUUID: {
        type: Sequelize.STRING
      },
      providerUUID: {
        type: Sequelize.STRING
      },
      notesDuringDiscontinue: {
        type: Sequelize.STRING,
        defaultValue: null
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
  
    return screensAssignedToPatient;
  };
  