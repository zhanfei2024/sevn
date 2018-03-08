'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};