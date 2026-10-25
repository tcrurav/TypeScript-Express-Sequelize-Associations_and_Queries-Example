'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('bicycle_details', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      bicycle_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "bicycles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      frame_material: {
        type: Sequelize.ENUM("Aluminum", "Carbon", "Steel", "Titanium")
      },
      wheel_size: {
        type: Sequelize.DECIMAL(4, 1),
        allowNull: false
      },
      weight: {
        type: Sequelize.DECIMAL(5, 2)
      },
      suspension: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bicycle_details');
  }
};
