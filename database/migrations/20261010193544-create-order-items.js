'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "orders", key: "id" }
      },
      bicycle_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "bicycles", key: "id" }
      },
      quantity: {
        type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
        validate: { min: 1 }
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2), allowNull: false,
        validate: { min: 0 }
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};
