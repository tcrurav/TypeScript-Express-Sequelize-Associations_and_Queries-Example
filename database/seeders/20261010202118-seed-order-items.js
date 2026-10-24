'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('order_items', [{
      id: 1,
      order_id: 1,
      bicycle_id: 1,
      quantity: 4,
      unit_price: 200,
      created_at: now,
      updated_at: now,
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.order_items', 'id'),
          COALESCE((SELECT MAX(id) FROM public.order_items), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_items', {
      id: [1]
    });
  }
};
