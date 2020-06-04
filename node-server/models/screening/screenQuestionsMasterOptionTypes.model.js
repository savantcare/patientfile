		answerInputType			

module.exports = (sequelize, Sequelize) => {
    const screenQuestionsMasterOptionTypes = sequelize.define("screenQuestionsMasterOptionTypes", {
      id: {
        type: Sequelize.INTEGER
      },
      screenID: {
        type: Sequelize.INTEGER
      },
      questionID: {
        type: Sequelize.INTEGER
      },
      answerInputType: {
        type: Sequelize.STRING
      },
      questionOption: {
        type: Sequelize.STRING
      },
      questionPointsForOption: {
        type: Sequelize.INTEGER
      },
    });
  
    return screenQuestionsMasterOptionTypes;
  };
