'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'dsei',
      {
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
      },
      {
        schema: 'covid19'
      }
    )
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('covid19.dsei', {
      schema: 'covid19'
    })
  }
}
