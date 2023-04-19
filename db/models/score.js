'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users);
      this.belongsTo(models.tests);
    }
  }
  Score.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        }
      },
      test_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "test",
          key: "id",
        }
      },
      student_answer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "student_answer",
          key: "id",
        }
      },
      score: DataTypes.INTEGER
    }, {
    sequelize,
    modelName: 'score',
  });
  return Score;
};