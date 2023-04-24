"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class_subject extends Model {
    static associate(models) {
      this.belongsToMany(models.users, { through: "users_class_subjects" });
      this.hasMany(models.users_class_subjects, { as: "class" });
      // define association here
    }
  }
  Class_subject.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "class_subjects",
      underscored: true,
    }
  );
  return Class_subject;
};
