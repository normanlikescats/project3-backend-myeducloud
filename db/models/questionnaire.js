"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.student_answers);
      this.belongsTo(models.tests);
    }
  }
  Questionnaire.init(
    {
      test_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "test",
          key: "id",
        },
      },
      question: DataTypes.STRING,
      option_a: DataTypes.STRING,
      option_b: DataTypes.STRING,
      option_c: DataTypes.STRING,
      option_d: DataTypes.STRING,
      option_e: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "questionnaires",
      underscored: true,
    }
  );
  return Questionnaire;
};
