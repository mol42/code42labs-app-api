'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: { type: DataTypes.STRING, field: "first_name" },
      lastName: { type: DataTypes.STRING, field: "last_name" },
      countryId: { type: Sequelize.INTEGER, field: "country_id" },
      email: { type: Sequelize.STRING, unique: true },
      hashedPassword: { type: Sequelize.STRING, field: "hashed_password" },
      referralCode: { type: Sequelize.STRING, field: "referral_code" },
      avatarId: { type: Sequelize.INTEGER, field: "avatar_id" },
      phone: { type: Sequelize.STRING },
      birthdate: Sequelize.DATE,
      welcomed: { type: Sequelize.BOOLEAN, field: "welcomed" },
      lastAnnouncement: { type: Sequelize.STRING, field: "last_announcement" },
      salt: Sequelize.STRING,
      status: Sequelize.TINYINT,
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
    await queryInterface.dropTable('user');
  }
};