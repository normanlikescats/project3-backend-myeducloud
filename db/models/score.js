'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    static associate(models) {
      this.belongsTo(models.users);
      this.belongsTo(models.tests);
    }
  }
  Score.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        }
      },
      test_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "tests",
          key: "id",
        }
      },
      student_answer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "student_answers",
          key: "id",
        }
      },
      score: DataTypes.INTEGER
    },
    {
    sequelize,
    modelName: 'scores',
    underscored: true
  });
  return Score;
};