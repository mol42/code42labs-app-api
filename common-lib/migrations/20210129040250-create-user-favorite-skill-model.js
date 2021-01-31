'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user__favorite_skills', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      skillId: { type: Sequelize.INTEGER, field: "skill_id" },
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
    await queryInterface.dropTable('user__favorite_skills');
  }
};