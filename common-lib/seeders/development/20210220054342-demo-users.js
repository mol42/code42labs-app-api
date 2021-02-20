'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        first_name: "Tayfun",
        last_name: "YUGRUK",
        country_id: 1,
        email: "tayfunyugruk@gmail.com",
        hashed_password: "7be9e7af4d49815a96af05221e4acef0a98f99dc3c290c9e9334c869cf94d95d82237706c48cd81def427299b33b2341676c1fd443fe4f3b4ce7332ddb46ee8b",
        referral_code: null,
        avatar_id: null,
        phone: "",
        birthdate: null,
        welcomed: false,
        last_announcement: null,
        language_options: null,
        theme: 0,
        language: 1,
        salt: "c42L@bZ",
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
