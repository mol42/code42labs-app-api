'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('skills', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, field: "name" },
      image: { type: Sequelize.STRING, field: "image" },
      shortDescription: { type: Sequelize.STRING, field: "short_description" },
      longDescription: { type: Sequelize.STRING, field: "long_description" },
      skillTypeId: { type: Sequelize.INTEGER, field: "skill_type_id" },
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
    await queryInterface.dropTable('skills');
  }
};