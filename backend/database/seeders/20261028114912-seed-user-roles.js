'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('user_roles', [{
      id: 1,
      user_id: 1,
      role_id: 1,
      created_at: now,
      updated_at: now
    }, {
      id: 2,
      user_id: 1,
      role_id: 2,
      created_at: now,
      updated_at: now
    }, {
      id: 3,
      user_id: 1,
      role_id: 3,
      created_at: now,
      updated_at: now
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
            SELECT setval(
              pg_get_serial_sequence('public.user_roles', 'id'),
              COALESCE((SELECT MAX(id) FROM public.user_roles), 0) + 1,
              false
            );
          `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', { id: [1, 2, 3] });
  }
};
