'use strict';
module.exports = function(sequelize, DataTypes) {
    var Board = sequelize.define('Board', {
        name: DataTypes.STRING,
        owner_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Board.belongsTo(models.User, {
                    foreignKey: "owner_id"
                });
                Board.hasMany(models.Boardmember, {
                    foreignKey: "board_id"
                });

                Board.belongsToMany(models.User, {
                    through: models.Boardmember,
                    as: 'UserBoard',
                    foreignKey: 'board_id'
                });
            }
        }
    });
    return Board;
};
