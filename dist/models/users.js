'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/** Users database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Users model
 */
exports.default = function (sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Users.associate = function (models) {
        Users.hasMany(models.Recipes, {
            foreignKey: 'userId'
        });
        Users.hasMany(models.Reviews, {
            foreignKey: 'userId'
        });
        Users.hasMany(models.Favorites, {
            foreignKey: 'userId'
        });
        Users.hasMany(models.Upvotes, {
            foreignKey: 'userId'
        });
        Users.hasMany(models.Downvotes, {
            foreignKey: 'userId'
        });
    };
    return Users;
};