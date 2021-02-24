'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('skill_steps', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      skillId: { type: Sequelize.INTEGER, field: "skill_id" },
      name: { type: Sequelize.TEXT, field: "name" },
      order: { type: Sequelize.INTEGER, field: "order" },
      shortDescription: { type: Sequelize.TEXT, field: "short_description" },
      longDescription: { type: Sequelize.TEXT, field: "long_description" },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('skill_steps');
  }
};