"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.removeColumn(
      "questionnaires",
      "users_class_subject_id",
      {type: Sequelize.INTEGER,
      references: {
        model: "users_class_subjects",
        key: "id",
      },
    }
    );
    await queryInterface.addColumn("questionnaires", "test_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "tests",
        key: "id",
      },
=======
    await queryInterface.addColumn("users_class_subjects", "created_at", {
      type: Sequelize.DATE,
      allowNull: true,
>>>>>>> main
    });
    await queryInterface.addColumn("users_class_subjects", "updated_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("tests", "name", {type: Sequelize.STRING});
  },

  async down(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.addColumn("questionnaires", "users_class_subject_id", {type: Sequelize.INTEGER,
      references: {
        model: "users_class_subjects",
        key: "id",
      },
    });
    await queryInterface.removeColumn("questionnaires", "test_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "tests",
        key: "id",
      },
    });
    await queryInterface.dropTable("scores");
    await queryInterface.removeColumn("tests", "name", {type: Sequelize.STRING});
=======
    await queryInterface.removeColumn("users_class_subjects", "created_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.removeColumn("users_class_subjects", "updated_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
>>>>>>> main
  },
};
