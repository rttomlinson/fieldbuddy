'use strict';
const bcrypt = require("bcrypt");
const shortId = require("shortid");
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        hashedPassword: DataTypes.STRING,
        token: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.hasMany(models.Board, {
                    foreignKey: "owner_id"
                });
                User.hasMany(models.Boardmember, {
                    foreignKey: "member_id"
                });

                User.belongsToMany(models.Board, {
                    through: models.Boardmember,
                    as: 'BoardMember',
                    foreignKey: 'member_id'
                });
            },
            findByToken: function(token) {
                return User.findOne({
                        token
                    })
                    .then((user) => {
                        return user;
                    })
                    .catch((err) => {
                        return err;
                    });
            }
        },
        instanceMethods: {
            validatePassword: function(password) {
                let hashedPassword = this.getDataValue("hashedPassword");
                return bcrypt.compareSync(password, hashedPassword);
            }
        }
    });
    User.beforeCreate(async function(user, options, done) {
        //hashedPassword will temporarily be the actual password
        let password = user.getDataValue("hashedPassword");
        let hashedPassword = await bcrypt.hash(password, 8);
        user.setDataValue("hashedPassword", hashedPassword);
        done(null, options);
    });
    User.beforeCreate(async function(user, options, done) {
        //create token for user
        let email = user.getDataValue("email");
        let token = await bcrypt.hash(email + shortId.generate(), 8);
        user.setDataValue("token", token);
        done(null, options);
    });

    return User;
};
