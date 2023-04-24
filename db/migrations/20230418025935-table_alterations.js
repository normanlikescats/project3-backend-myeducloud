"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
    await queryInterface.addColumn("tests", "name", {type: Sequelize.STRING});
  },

  async down(queryInterface, Sequelize) {
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
  },
};
