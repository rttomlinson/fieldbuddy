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
    let cards = [];
    for (let i = 0; i < 150; i++){
        let card = {
            list_id: Math.floor(Math.random() * 50 + 1),
            title: faker.company.companyName(),
            description: faker.company.companyName(),
            completed: false
        };
        cards.push(card);
    }
    
    return queryInterface.bulkInsert("Cards", cards, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Cards', null, {}, models.Card);

  }
};
