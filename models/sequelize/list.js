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
    return List;
};
