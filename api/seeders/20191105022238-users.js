'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Anu',
      useremail: 'anurudh.ojha@neocepts.co.in',
      password: 'Anurudh@123',
      userphone: '9929920292',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Rajesh',
      useremail: 'rajesh@neocepts.co.in',
      password: 'Rajesh@123',
      userphone: '9929920292',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Prashant',
      useremail: 'prashant@neocepts.co.in',
      password: 'Prashant@123',
      userphone: '9929920292',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
