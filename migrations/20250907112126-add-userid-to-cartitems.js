"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("CartItems", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1, // For now, to avoid issues with existing data. Should be removed after real user system.
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("CartItems", "userId");
  },
};
