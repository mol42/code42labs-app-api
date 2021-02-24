'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user__skill_step_progresses', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      userId: { type: Sequelize.INTEGER, field: "user_id" },
      skillId: { type: Sequelize.INTEGER, field: "skill_id" },
      progress: { type: Sequelize.JSON, field: "progress" },
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
    await queryInterface.dropTable('user__skill_step_progresses');
  }
};