'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('brands', [{
      id: 1,
      name: "Orbea",
      createdAt: now,
      updatedAt: now
    }, {
      id: 2,
      name: "Trek",
      createdAt: now,
      updatedAt: now
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};
