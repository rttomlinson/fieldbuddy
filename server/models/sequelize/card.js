'use strict';
module.exports = function(sequelize, DataTypes) {
    var Card = sequelize.define('Card', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN,
        listId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Card.belongsTo(models.List, {
                    foreignKey: "listId"
                });
                
                Card.hasMany(models.Cardmember, {
                    foreignKey: "cardId"
                });
                Card.belongsToMany(models.User, {
                    through: models.Cardmember,
                    as: 'UserCard',
                    foreignKey: 'cardId',
                    otherKey: 'memberId'
                });
            }
        }
    });
    return Card;
};
