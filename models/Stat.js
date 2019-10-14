'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define('Stat', {
    username: DataTypes.STRING,
    accuracy: DataTypes.DOUBLE,
    latency: DataTypes.DOUBLE,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        }
      }
    }
  );
  return Stat;
};