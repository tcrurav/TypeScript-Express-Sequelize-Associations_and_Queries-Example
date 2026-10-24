'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('bicycle_details', [{
      id: 1,
      bicycle_id: 1,
      frame_material: "Aluminum",
      wheel_size: 2,
      weight: 30,
      suspension: "hidráulica",
      created_at: now,
      updated_at: now,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bicycle_details', null, {});
  }
};
