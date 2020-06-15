module.exports = (sequelize, Sequelize) => {
  const Component = sequelize.define("weight", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    patientUUID: {
      type: Sequelize.STRING
    },
    weightInPounds: {
      type: Sequelize.INTEGER
    },
    measurementDate: {
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
