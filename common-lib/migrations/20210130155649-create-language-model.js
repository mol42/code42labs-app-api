'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('languages', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, field: "name" },
      shortDescription: { type: Sequelize.STRING, field: "short_description" },
      longDescription: { type: Sequelize.STRING, field: "long_description" },
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
    await queryInterface.dropTable('languages');
  }
};