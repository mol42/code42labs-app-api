'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("skills", [
      {
        id: 1,
        name: "Javascript",
        image: "javascript.png",
        short_description: "Javascript web icin onemli bir dil",
        long_description: "Javascript web icin onemli bir dil",
        skill_type_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};
