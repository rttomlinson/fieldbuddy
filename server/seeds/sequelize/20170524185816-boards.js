'use strict';
const faker = require('faker');
const models = require('../../models/sequelize');
const Board = models.Board;
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
    let boards = [];
    for (let i = 0; i < 20; i++){
        let board = {
            ownerId: Math.floor(Math.random() * 10 + 1),
            name: faker.address.country(),
        };
        boards.push(board);
    }
    
    return queryInterface.bulkInsert("Boards", boards, {});

    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Boards', null, {}, models.Board);

  }
};
