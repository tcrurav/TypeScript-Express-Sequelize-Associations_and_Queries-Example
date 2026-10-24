'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('orders', [{
      id: 1,
      customer_id: 1,
      order_date: now,
      status: "paid",
      created_at: now,
      updated_at: now,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
