'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTask = sequelize.define('UserTask', {
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {});
  UserTask.associate = function(models) {
    // associations can be defined here
  };
  return UserTask;
};