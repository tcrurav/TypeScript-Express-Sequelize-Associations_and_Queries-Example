'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true, primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(160),
        allowNull: false,
        unique: true
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
