'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
