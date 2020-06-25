module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define("user_role", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    componentsAllowedToAccess: {
      type: Sequelize.STRING
    },
    multiStateDisplayAreaComponentLoadSequence: {
      type: Sequelize.STRING
    },
    currentStateDisplayAreaComponentLoadSequence: {
      type: Sequelize.STRING
    }, 
  },   
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  UserRole.associate = function (models) {
    UserRole.hasMany(models.user, { as: 'users' })
  };

  return UserRole;
};
