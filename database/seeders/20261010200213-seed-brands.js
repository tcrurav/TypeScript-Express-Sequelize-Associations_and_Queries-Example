'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('brands', [{
      id: 1,
      name: "Orbea",
      created_at: now,
      updated_at: now
    }, {
      id: 2,
      name: "Trek",
      created_at: now,
      updated_at: now
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};
