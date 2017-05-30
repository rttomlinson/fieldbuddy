"use strict";

const models = require('../../models/sequelize');
const User = models.User;
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
    let users = [];
    for (let i = 1; i <= 10; i++){
        let user = User.create({
            email: `admin${i}@admin.com`,
            hashedPassword: "admin",
            username: `admin${i}`
        });
        users.push(user);
    }
    return Promise.all(users);
    // return User.create({
    //   email: "admin@admin.com",
    //   hashedPassword: "admin",
    //   username: "admin"
    // });
    
    
    
    
    
    //return queryInterface.bulkInsert("Users", users, {});

  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('Users', null, {}, models.User);

  }
};
