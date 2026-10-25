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

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.brands', 'id'),
          COALESCE((SELECT MAX(id) FROM public.brands), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', { id: [1, 2] });
  }
};
