'use strict';
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
    let cardmembers = [];
        //first make sure each board has at least 1 board member
        for (let i = 1; i <= 20; i++) {
            let cardmember = {
                memberId: Math.floor(Math.random() * 10 + 1),
                cardId: i,
            };
            cardmembers.push(cardmember);
        }
        //then randomize again
        for (let i = 0; i < 450; i++) {
            let cardmember = {
                memberId: Math.floor(Math.random() * 10 + 1),
                cardId: Math.floor(Math.random() * 150 + 1),
            };
            cardmembers.push(cardmember);
        }
        return queryInterface.bulkInsert("Cardmembers", cardmembers, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Cardmembers', null, {}, models.Cardmember);

  }
};
