'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SkillNewsModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      skillId: { type: Sequelize.INTEGER, field: "skill_id" },
      title: { type: Sequelize.TEXT, field: "title" },
      smallImage: { type: Sequelize.TEXT, field: "small_image" },
      largeImage: { type: Sequelize.TEXT, field: "large_image" },
      summary: { type: Sequelize.TEXT, field: "summary" },
      content: { type: Sequelize.TEXT, field: "content" },
      languageId: { type: Sequelize.INTEGER, field: "language_id" },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SkillNewsModels');
  }
};