"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "chatrooms",
      [
        {
          class_subject_id: 1,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          class_subject_id: 2,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          class_subject_id: 3,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          class_subject_id: 4,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          class_subject_id: 5,
          updated_at: new Date(),
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("chatrooms", null, {});
  },
};
