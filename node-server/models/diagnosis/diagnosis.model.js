module.exports = (sequelize, Sequelize) => {
  const diagnosis = sequelize.define("diagnosis", {

    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    patientUUId: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    icd10Code: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
    },
    agree: {
      type: Sequelize.STRING
    },
    assessment: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.DATE
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
    // Timestamps
  });

  return diagnosis;
};
