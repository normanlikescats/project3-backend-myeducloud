"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users);
      this.belongsTo(models.chatrooms);
    }
  }

  Message.init(
    {
      message: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      chatroom_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "messages",
      underscored: true,
    }
  );
  return Message;
};
