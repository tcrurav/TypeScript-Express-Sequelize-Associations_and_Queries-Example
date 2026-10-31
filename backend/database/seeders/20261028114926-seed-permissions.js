'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('permissions', [{
      id: 1,
      name: "bicycles:read",
      created_at: now,
      updated_at: now
    }, {
      id: 2,
      name: "bicycles:create",
      created_at: now,
      updated_at: now
    }, {
      id: 3,
      name: "bicycles:update",
      created_at: now,
      updated_at: now
    }, {
      id: 4,
      name: "bicycles:delete",
      created_at: now,
      updated_at: now
    }, {
      id: 5,
      name: "orders:read",
      created_at: now,
      updated_at: now
    }, {
      id: 6,
      name: "orders:create",
      created_at: now,
      updated_at: now
    }, {
      id: 7,
      name: "orders:update",
      created_at: now,
      updated_at: now
    }, {
      id: 8,
      name: "users:manage",
      created_at: now,
      updated_at: now
    }, {
      id: 9,
      name: "roles:manage",
      created_at: now,
      updated_at: now
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
            SELECT setval(
              pg_get_serial_sequence('public.permissions', 'id'),
              COALESCE((SELECT MAX(id) FROM public.permissions), 0) + 1,
              false
            );
          `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', { id: [1, 2, 3, 4, 5, 6, 7, 8, 9] });
  }
};
