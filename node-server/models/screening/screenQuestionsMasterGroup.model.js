/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/	
module.exports = (sequelize, Sequelize) => {
    const screenQuestionsMasterGroup = sequelize.define("screenQuestionsMasterGroup", {
      id: {
        type: Sequelize.INTEGER
      },
      groupName: {
        type: Sequelize.INTEGER
      },
      priority: {
        type: Sequelize.INTEGER
      },
      isItLocked: {
        type: Sequelize.STRING,
        defaultValue: 'No'
      }
    });
  
    return screenQuestionsMasterGroup;
  };