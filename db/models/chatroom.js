"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chatroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.users, {
        through: "messages",
        foreignKey: "chatroom_id",
      });
      this.hasMany(models.messages, {
        foreignKey: "chatroom_id",
        as: "chatroom",
      });
    }
  }
  Chatroom.init(
    {
      users_class_subject_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chatrooms",
      underscored: true,
    }
  );
  return Chatroom;
};
