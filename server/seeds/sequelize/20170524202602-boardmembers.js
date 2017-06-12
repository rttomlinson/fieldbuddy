'use strict';
const models = require('../../models/sequelize');

module.exports = {
    up: function(queryInterface, Sequelize) {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        let boardmembers = [];
        //first make sure each board has at least 1 board member
        for (let i = 1; i <= 20; i++) {
            let boardmember = {
                memberId: Math.floor(Math.random() * 10 + 1),
                boardId: i,
            };
            boardmembers.push(boardmember);
        }
        //then randomize again
        for (let i = 0; i < 40; i++) {
            let boardmember = {
                memberId: Math.floor(Math.random() * 10 + 1),
                boardId: Math.floor(Math.random() * 20 + 1),
            };
            boardmembers.push(boardmember);
        }
        return queryInterface.bulkInsert("Boardmembers", boardmembers, {});
    },

    down: function(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete('Boardmembers', null, {}, models.Boardmember);

    }
};
