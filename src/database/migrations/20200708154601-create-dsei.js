'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dsei', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('dsei')
  }
}
