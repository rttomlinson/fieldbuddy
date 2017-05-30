'use strict';
module.exports = function(sequelize, DataTypes) {
    var Cardmember = sequelize.define('Cardmember', {
        memberId: DataTypes.INTEGER,
        cardId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Cardmember.belongsTo(models.User, {
                    foreignKey: "memberId"
                });

                Cardmember.belongsTo(models.Card, {
                    foreignKey: "cardId"
                });
            }
        }
    });
    return Cardmember;
};
