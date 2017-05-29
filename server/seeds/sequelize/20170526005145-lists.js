'use strict';
const faker = require('faker');
const models = require('../../models/sequelize');
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    
    
    let lists = [];
    for (let i = 0; i < 50; i++){
        let list = {
            board_id: Math.floor(Math.random() * 20 + 1),
            name: faker.company.companyName(),
        };
        lists.push(list);
    }
    
    return queryInterface.bulkInsert("Lists", lists, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Lists', null, {}, models.List);

  }
};
