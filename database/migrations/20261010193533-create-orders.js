'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      customerId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "customers", key: "id" }
      },
      orderDate: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      status: {
        type: Sequelize.ENUM("pending", "paid", "shipped", "cancelled"),
        allowNull: false, defaultValue: "pending"
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
