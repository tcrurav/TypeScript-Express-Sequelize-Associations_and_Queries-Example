'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('customers', [{
      id: 1,
      name: "Pepe",
      email: "pepe@pepe.com",
      created_at: now,
      updated_at: now
    }, {
      id: 2,
      name: "Juan",
      email: "juan@juan.com",
      created_at: now,
      updated_at: now
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.customers', 'id'),
          COALESCE((SELECT MAX(id) FROM public.customers), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', {
      id: [1, 2]
    });
  }
};
