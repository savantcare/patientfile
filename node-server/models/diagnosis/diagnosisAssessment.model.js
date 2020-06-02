module.exports = (sequelize, Sequelize) => {
  const diagnosisAssessment = sequelize.define("diagnosisAssessment", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    diagnosisId: {
      type: Sequelize.STRING
    },
    uid: {
      type: Sequelize.STRING
    },
    assessment: {
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
    // Timestamps
  });

  return diagnosisAssessment;
};
