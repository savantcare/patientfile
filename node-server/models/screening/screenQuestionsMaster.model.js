/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/	

module.exports = (sequelize, Sequelize) => {
    const screenQuestionsMaster = sequelize.define("screenQuestionsMaster", {
      id: {
        type: Sequelize.INTEGER
      },
      screenID: {
        type: Sequelize.INTEGER
      },
      groupID: {
        type: Sequelize.INTEGER
      },
      isItLocked: {
        type: Sequelize.STRING,
        defaultValue: 'No'
      },
      question: {
        type: Sequelize.STRING
      },
      imageFile: {
        type: Sequelize.BLOB('long')
      },
      imageFileName: {
        type: Sequelize.STRING
      },
      isRequired: {
        type: Sequelize.STRING,
        defaultValue: 'Yes'
      },
    });
  
    return screenQuestionsMaster;
  };