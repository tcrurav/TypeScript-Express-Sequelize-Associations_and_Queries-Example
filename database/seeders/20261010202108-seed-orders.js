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

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.orders', 'id'),
          COALESCE((SELECT MAX(id) FROM public.orders), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', {
      id: [1]
    });
  }
};
