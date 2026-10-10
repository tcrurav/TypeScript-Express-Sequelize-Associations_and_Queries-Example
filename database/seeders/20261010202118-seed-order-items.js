'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('order_items', [{
      id: 1,
      orderId: 1,
      bicycleId: 1,
      quantity: 4,
      unitPrice: 200,
      createdAt: now,
      updatedAt: now,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_items', null, {});
  }
};
