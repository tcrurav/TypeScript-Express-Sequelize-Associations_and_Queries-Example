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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
