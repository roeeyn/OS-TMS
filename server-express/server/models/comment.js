'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    /*userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,*/
    commentText: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.hasOne(models.User);
    Comment.hasOne(models.Task);
  };
  return Comment;
};