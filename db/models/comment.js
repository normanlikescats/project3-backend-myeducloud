"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init(
    {
      comment: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      questionnaire_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "comments",
      underscored: true,
    }
  );
  return Comment;
};
