'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    status: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.hasMany(models.Comment);
    Task.belongsToMany(models.User, { through: 'UserTask' });
  };
  return Task;
};