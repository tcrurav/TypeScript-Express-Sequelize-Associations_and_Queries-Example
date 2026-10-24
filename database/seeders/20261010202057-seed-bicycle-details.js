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

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.bicycle_details', 'id'),
          COALESCE((SELECT MAX(id) FROM public.bicycle_details), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bicycle_details', {
      id: [1]
    });
  }
};
