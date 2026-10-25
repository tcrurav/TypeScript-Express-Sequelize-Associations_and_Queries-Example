'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bicycles", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      brand_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "brands", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      model: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      stock: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bicycles');
  }
};
