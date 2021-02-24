'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('skill_news', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      skillId: { type: Sequelize.INTEGER, field: "skill_id" },
      title: { type: Sequelize.TEXT, field: "title" },
      smallImage: { type: Sequelize.TEXT, field: "small_image" },
      largeImage: { type: Sequelize.TEXT, field: "large_image" },
      summary: { type: Sequelize.TEXT, field: "summary" },
      content: { type: Sequelize.TEXT, field: "content" },
      languageId: { type: Sequelize.INTEGER, field: "language_id" },
      publishDate: { type: DataTypes.DATE, field: "publish_date" },
      isPublished: { type: DataTypes.BOOLEAN, field: "is_published" },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at" 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at" 
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('skill_news');
  }
};