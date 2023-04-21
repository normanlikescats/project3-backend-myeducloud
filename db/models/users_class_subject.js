"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersClassSubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users);
      this.belongsTo(models.class_subjects);
      // define association here
    }
  }
  UsersClassSubject.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      class_subject_id: {
        type: DataTypes.INTEGER,
        references: { model: "class_subjects", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "users_class_subjects",
      underscored: true,
    }
  );
  return UsersClassSubject;
};
