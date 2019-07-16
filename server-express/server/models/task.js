'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    status: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Comment);
    Task.belongsToMany(models.UserTask);
  };
  return Task;
};