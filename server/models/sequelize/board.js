'use strict';


module.exports = function(sequelize, DataTypes) {
    var Board = sequelize.define('Board', {
        name: DataTypes.STRING,
        ownerId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Board.belongsTo(models.User, {
                    foreignKey: "ownerId"
                });
                Board.hasMany(models.Boardmember, {
                    foreignKey: "boardId"
                });
                Board.belongsToMany(models.User, {
                    through: models.Boardmember,
                    as: 'UserBoard',
                    foreignKey: 'boardId',
                    otherKey: 'memberId'
                });
                Board.hasMany(models.List, {
                    foreignKey: "boardId"
                });
            }
        }
    });
    Board.afterDestroy((board) => {
        console.log("board deleted", board);
        let List = sequelize.models.List;
        List.destroy({
            where: { boardId: board.id },
            individualHooks: true
        });
    });
    return Board;
};
