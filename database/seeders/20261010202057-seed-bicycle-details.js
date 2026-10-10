'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('bicycle_details', [{
      id: 1,
      bicycleId: 1,
      frameMaterial: "Aluminum",
      wheelSize: 2,
      weight: 30,
      suspension: "hidráulica",
      createdAt: now,
      updatedAt: now,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bicycle_details', null, {});
  }
};
