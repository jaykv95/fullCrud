'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceName: {
        type: Sequelize.STRING
      },

      macAddress: {
        type: Sequelize.STRING
      },
      ipAddress: {
        type: Sequelize.STRING
      },
      deviceStatus: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Devices');
  }
};