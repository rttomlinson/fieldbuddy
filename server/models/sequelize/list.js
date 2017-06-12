'use strict';
module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define('List', {
        name: DataTypes.STRING,
        boardId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                List.belongsTo(models.Board, {
                    foreignKey: "boardId"
                });
                List.hasMany(models.Card, {
                    foreignKey: "listId"
                });
            }
        }
    });
    List.afterDestroy((list) => {
        console.log("deleting associatied lists", list.id);
        let Card = sequelize.models.Card;
        Card.destroy({
            where: { listId: list.id },
            individualHooks: true
        });
    });
    return List;
};
