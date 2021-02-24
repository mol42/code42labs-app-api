'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user__favorite_skills", [
      {
        id: 1 ,
        user_id: 1,
        favorites: "[1]",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user__favorite_skills', null, {});
  }
};
