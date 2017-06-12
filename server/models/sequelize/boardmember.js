'use strict';
module.exports = function(sequelize, DataTypes) {
    var Boardmember = sequelize.define('Boardmember', {
        memberId: DataTypes.INTEGER,
        boardId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Boardmember.belongsTo(models.User, {
                    foreignKey: "memberId"
                });

                Boardmember.belongsTo(models.Board, {
                    foreignKey: "boardId"
                });
            }
        }
    });
    return Boardmember;
};
