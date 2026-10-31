'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: "ADMIN",
      created_at: now,
      updated_at: now
    }, {
      id: 2,
      name: "MANAGER",
      created_at: now,
      updated_at: now
    }, {
      id: 3,
      name: "CUSTOMER",
      created_at: now,
      updated_at: now
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
            SELECT setval(
              pg_get_serial_sequence('public.roles', 'id'),
              COALESCE((SELECT MAX(id) FROM public.roles), 0) + 1,
              false
            );
          `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', { id: [1, 2, 3] });
  }
};
