module.exports = (sequelize, Sequelize) => {
  const Component = sequelize.define("pulse", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    beatsPerMinuteValue: {
      type: Sequelize.INTEGER
    },
    timeOfEvaluation: {
      type: Sequelize.DATE
    },
    Notes: {
      type: Sequelize.STRING
    },
    recordChangedByUUID: {
      type: Sequelize.STRING
    },
    recordChangedFromIPAddress: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Component;
};
