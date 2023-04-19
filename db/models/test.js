"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    static associate(models) {
      this.hasMany(models.questionnaires);
      //this.hasMany(models.score);
    }
  }
  Test.init(
    {
      users_class_subject_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tests",
      underscored: true,
    }
  );
  return Test;
};
