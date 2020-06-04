/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/

module.exports = (sequelize, Sequelize) => {
    const screenAnswerDetailsOfPatient = sequelize.define("screenAnswerDetailsOfPatient", {
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      patientUUID: {
        type: Sequelize.STRING
      },
      screenReportUUID: {
        type: Sequelize.STRING
      },
      questionID: {
        type: Sequelize.INTEGER
      },
      answerID: {
        type: Sequelize.INTEGER
      },
      answerValueDetails: {
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
  
    return screenAnswerDetailsOfPatient;
  };
  