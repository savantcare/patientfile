/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/
module.exports = (sequelize, Sequelize) => {
    const phq9PatientResponse = sequelize.define("phq9PatientResponse", {
      responseUUID: {
        type: Sequelize.STRING(64),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      patientUUID: {
        type: Sequelize.STRING(64)
      },
      question1: {
        type: Sequelize.INTEGER
      },
      question2: {
        type: Sequelize.INTEGER
      },
      question3: {
        type: Sequelize.INTEGER
      },
      question4: {
        type: Sequelize.INTEGER
      },
      question5: {
        type: Sequelize.INTEGER
      },
      question6: {
        type: Sequelize.INTEGER
      },
      question7: {
        type: Sequelize.INTEGER
      },
      question8: {
        type: Sequelize.INTEGER
      },
      question9: {
        type: Sequelize.INTEGER
      },
      recordChangedByUUID: {
        type: Sequelize.STRING(64)
      },
      recordChangedFromIPAddress: {
        type: Sequelize.STRING(20),
        defaultValue: null
      }
    });
  
    return phq9PatientResponse;
  };
  