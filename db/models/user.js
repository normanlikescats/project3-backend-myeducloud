"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.scores)
      this.hasMany(models.users_class_subject)
      this.hasMany(models.student_answers)
      this.belongsToMany(models.chatrooms, {
        through: "messages",
        foreignKey: "user_id",
      });
      this.hasMany(models.messages, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      photo_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "users",
      underscored: true,
    }
  );
  return User;
};
