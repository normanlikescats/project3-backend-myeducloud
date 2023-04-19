"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "questionnaires",
      "users_class_subject_id"
    );
    await queryInterface.addColumn("questionnaires", "test_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "tests",
        key: "id",
      },
    });
    await queryInterface.createTable("scores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      test_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tests",
          key: "id",
        },
      },
      student_answer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "student_answers",
          key: "id",
        },
      },
      score: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("questionnaires", "users_class_subject_id");
    await queryInterface.removeColumn("questionnaires", "test_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "tests",
        key: "id",
      },
    });
    await queryInterface.dropTable("scores");
  },
};
