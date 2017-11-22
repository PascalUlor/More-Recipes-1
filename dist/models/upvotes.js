'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/** Defines Upvotes database model and foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} The Upvotes model
 */
exports.default = function (sequelize, DataTypes) {
    var Upvotes = sequelize.define('Upvotes', {
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
    Upvotes.associate = function (models) {
        Upvotes.belongsTo(models.Recipes, {
            foreignKey: 'recipeId',
            onDelete: 'CASCADE'
        });
        Upvotes.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Upvotes;
};