'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('role_permissions', [{   
      id: 1,                    /* ADMIN */
      role_id: 1,
      permission_id: 1,
      created_at: now,
      updated_at: now
    },{
      id: 2,
      role_id: 1,
      permission_id: 2,
      created_at: now,
      updated_at: now
    },{
      id: 3,
      role_id: 1,
      permission_id: 3,
      created_at: now,
      updated_at: now
    },{
      id: 4,
      role_id: 1,
      permission_id: 4,
      created_at: now,
      updated_at: now
    },{
      id: 5,
      role_id: 1,
      permission_id: 5,
      created_at: now,
      updated_at: now
    },{
      id: 6,
      role_id: 1,
      permission_id: 6,
      created_at: now,
      updated_at: now
    },{
      id: 7,
      role_id: 1,
      permission_id: 7,
      created_at: now,
      updated_at: now
    },{
      id: 8,
      role_id: 1,
      permission_id: 8,
      created_at: now,
      updated_at: now
    },{
      id: 9,
      role_id: 1,
      permission_id: 9,
      created_at: now,
      updated_at: now
    },{                         
      id: 10,                    /* MANAGER */
      role_id: 2,
      permission_id: 1,
      created_at: now,
      updated_at: now
    },{
      id: 11,
      role_id: 2,
      permission_id: 2,
      created_at: now,
      updated_at: now
    },{
      id: 12,
      role_id: 2,
      permission_id: 3,
      created_at: now,
      updated_at: now
    },{
      id: 13,
      role_id: 2,
      permission_id: 5,
      created_at: now,
      updated_at: now
    },{
      id: 14,
      role_id: 2,
      permission_id: 6,
      created_at: now,
      updated_at: now
    },{
      id: 15,
      role_id: 2,
      permission_id: 7,
      created_at: now,
      updated_at: now
    },{
      id: 16,                    /* CUSTOMER */
      role_id: 3,
      permission_id: 1,
      created_at: now,
      updated_at: now
    },{
      id: 17,
      role_id: 3,
      permission_id: 5,
      created_at: now,
      updated_at: now
    },{
      id: 18,
      role_id: 3,
      permission_id: 6,
      created_at: now,
      updated_at: now
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
            SELECT setval(
              pg_get_serial_sequence('public.role_permissions', 'id'),
              COALESCE((SELECT MAX(id) FROM public.role_permissions), 0) + 1,
              false
            );
          `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', { id: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] 
    });
  }
};
