'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('skill_step_resources', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      skillId: { type: Sequelize.INTEGER, field: "skill_id" },
      skillStepId: { type: Sequelize.INTEGER, field: "skill_step_id" },
      type: { type: Sequelize.INTEGER, field: "type" },
      languageId: { type: Sequelize.INTEGER, field: "language_id" },
      data: { type: Sequelize.JSON, field: "data" },
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
    await queryInterface.dropTable('skill_step_resources');
  }
};