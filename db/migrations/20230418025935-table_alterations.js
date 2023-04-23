"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users_class_subjects", "created_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("users_class_subjects", "updated_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users_class_subjects", "created_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.removeColumn("users_class_subjects", "updated_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
