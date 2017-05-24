const db = require('../models/sequelize');
const _ = require("underscore");

module.exports = (wagner) => {
    //get keys of db models again
    //add model names to wagner
    let models = Object.keys(db);
    _.each(models, function(model) {
        wagner.factory(model, function() {
            return db[model];
        });
    });



    wagner.factory("db", function() {
        return db;
    });
    wagner.factory("sequelize", function() {
        return db.sequelize;
    });
    wagner.factory("Sequlize", function() {
        return db.Sequelize;
    });
};