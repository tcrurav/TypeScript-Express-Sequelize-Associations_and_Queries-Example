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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bicycles', null, {});
  }
};
