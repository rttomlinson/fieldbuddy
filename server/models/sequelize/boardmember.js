'use strict';
module.exports = function(sequelize, DataTypes) {
    var Boardmember = sequelize.define('Boardmember', {
        member_id: DataTypes.INTEGER,
        board_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Boardmember.belongsTo(models.User, {
                    foreignKey: "member_id"
                });

                Boardmember.belongsTo(models.Board, {
                    foreignKey: "board_id"
                });
            }
        }
    });
    return Boardmember;
};
