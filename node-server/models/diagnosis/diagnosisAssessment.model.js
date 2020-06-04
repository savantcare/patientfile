module.exports = (sequelize, Sequelize) => {
  const diagnosisAssessment = sequelize.define("diagnosisAssessment", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    diagnosisUUId: {
      type: Sequelize.STRING
    },
    patientUUId: {
      type: Sequelize.STRING
    },
    diagnosisAssessment: {
      type: Sequelize.STRING
    },
    recordChangedByUUID: {
      type: Sequelize.STRING
    },
    recordChangedOnDateTime: {
      type: Sequelize.DATE
    },
    recordChangedFromIPAddress: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    // Timestamps
  },{
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  });

  return diagnosisAssessment;
};
