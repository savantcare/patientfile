/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/	

module.exports = (sequelize, Sequelize) => {
    const screensListMaster = sequelize.define("screensListMaster", {
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      screenName: {
        type: Sequelize.STRING
      },
      scientificName: {
        type: Sequelize.STRING
      },
      clinicalStudies: {
        type: Sequelize.TEXT
      }
    });
  
    return screensListMaster;
  };
  