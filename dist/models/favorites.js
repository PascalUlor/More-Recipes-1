'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/** Defines the Favorite database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Favorites model
 */
exports.default = function (sequelize, DataTypes) {
    var Favorites = sequelize.define('Favorites', {
        userId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        recipeId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'Recipes',
                key: 'id'
            }
        }
    });
    Favorites.associate = function (models) {
        Favorites.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Favorites.belongsTo(models.Recipes, {
            foreignKey: 'recipeId',
            onDelete: 'CASCADE'
        });
    };
    return Favorites;
};