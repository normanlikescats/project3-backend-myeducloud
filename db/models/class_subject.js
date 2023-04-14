"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class_subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Class_subject.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "class_subject",
      underscored: true,
    }
  );
  return Class_subject;
};
