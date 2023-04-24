"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.questionnaires);
      this.belongsTo(models.users)
    }
  }
  Student_answer.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        }
      },
      questionnaire_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "questionnaire",
          key: "id",
        }
      },
      answer: DataTypes.TEXT,
      teacher_comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "student_answers",
      underscored: true,
    }
  );
  return Student_answer;
};
