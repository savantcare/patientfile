// module.exports = (sequelize, Sequelize) => {
//   const Reminder = sequelize.define("reminder", {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     reminderID: {
//       type: Sequelize.STRING
//     },
//     description: {
//       type: Sequelize.STRING
//     },
//     discontinue: {
//       type: Sequelize.BOOLEAN,
//       defaultValue: 0
//     },
//     patientId: {
//       type: Sequelize.STRING
//     },
//     createdByUserId: {
//       type: Sequelize.STRING
//     },
//     discontinuedByUserId: {
//       type: Sequelize.STRING
//     },
//     // Timestamps
//     createdAt: Sequelize.DATE,
//     updatedAt: Sequelize.DATE,
//     discontinueAt: Sequelize.DATE
//   });

//   return Reminder;
// };

module.exports = (sequelize, Sequelize) => {
const Reminder = sequelize.define("reminder_new", {
uuid: {
type: Sequelize.STRING,
primaryKey: true,
defaultValue: Sequelize.UUIDV4
},
patientUUID: {
type: Sequelize.STRING
},
description: {
type: Sequelize.STRING
},
recordChangedByUUID: {
type: Sequelize.STRING
},
recordChangedOnDateTime: {
type: Sequelize.DATE,
defaultValue: Sequelize.NOW
},
recordChangedFromIPAddress: {
type: Sequelize.STRING,
defaultValue: null
},
recordChangedFromSection: {
type: Sequelize.STRING,
defaultValue: 'patientFile'
}
});

return Reminder;
};