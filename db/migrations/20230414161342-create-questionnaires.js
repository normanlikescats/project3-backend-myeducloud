"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questionnaires", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      test_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tests",
          key: "id",
        },
      },
      question: {
        type: Sequelize.STRING,
      },
      option_a: {
        type: Sequelize.STRING,
      },
      option_b: {
        type: Sequelize.STRING,
      },
      option_c: {
        type: Sequelize.STRING,
      },
      option_d: {
        type: Sequelize.STRING,
      },
      option_e: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("questionnaires");
  },
};
