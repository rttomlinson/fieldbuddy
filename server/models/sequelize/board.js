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
                Board.hasMany(models.List, {
                    foreignKey: "board_id"
                });
            }
        }
    });
    Board.afterDestroy((board) => {
        console.log("board deleted", board);
        let List = sequelize.models.List;
        List.destroy({
            where: { board_id: board.id },
            individualHooks: true
        });
    });
    return Board;
};
