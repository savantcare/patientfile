/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/

module.exports = (sequelize, Sequelize) => {
  const Diagnosis = sequelize.define("diagnoses", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    diagnosisName: {
      type: Sequelize.STRING
    },
    icd10Code:{
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    assessment: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    agree: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.DATE
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
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    recordChangedFromIPAddress: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return Diagnosis;
};
