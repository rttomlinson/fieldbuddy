'use strict';
module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define('List', {
        name: DataTypes.STRING,
        board_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                List.belongsTo(models.Board, {
                    foreignKey: "board_id"
                });
                List.hasMany(models.Card, {
                    foreignKey: "list_id"
                });
            }
        }
    });
    List.afterDestroy((list) => {
        console.log("deleting associatied lists", list.id);
        let Card = sequelize.models.Card;
        Card.destroy({
            where: { list_id: list.id },
            individualHooks: true
        });
    });
    return List;
};
