/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/	

module.exports = (sequelize, Sequelize) => {
    const screensListMaster = sequelize.define("screensListMaster", {
      id: {
        type: Sequelize.INTEGER
      },
      screenName: {
        type: Sequelize.STRING
      },
      scientificName: {
        type: Sequelize.STRING
      },
      clinicalStudies: {
        type: Sequelize.STRING
      },
      isItLocked: {
        type: Sequelize.STRING
      },
      dynamicTableAliasName: {
        type: Sequelize.STRING
      },
    });
  
    return screensListMaster;
  };
  