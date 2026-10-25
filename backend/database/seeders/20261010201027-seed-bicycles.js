'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('bicycles', [{
      id: 1,
      brand_id: 1,
      model: "Alma H30",
      description: "Bicicleta de montaña",
      price: 1199.00,
      stock: 8,
      created_at: now,
      updated_at: now,
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.bicycles', 'id'),
          COALESCE((SELECT MAX(id) FROM public.bicycles), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bicycles', { id: [1] });
  }
};
