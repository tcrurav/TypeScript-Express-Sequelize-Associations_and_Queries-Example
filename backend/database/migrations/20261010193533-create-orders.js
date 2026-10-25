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
      customer_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "customers", key: "id" }
      },
      order_date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      status: {
        type: Sequelize.ENUM("pending", "paid", "shipped", "cancelled"),
        allowNull: false, defaultValue: "pending"
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
