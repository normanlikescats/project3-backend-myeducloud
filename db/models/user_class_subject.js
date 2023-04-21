"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_class_subject extends Model {
    static associate(models) {
      this.belongsTo(models.users)
      this.belongsTo(models.class_subjects)
    }
  }
  User_class_subject.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        }
      },
      class_subject_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "class_subject",
          key: "id",
        }
      },
    },
    {
      sequelize,
      modelName: "users_class_subject",
      underscored: true,
    }
  );
  return User_class_subject;
};
