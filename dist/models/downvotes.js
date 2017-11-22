'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/** Defines Downvotes database model and foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @return {obj} The Downvotes model
 */
exports.default = function (sequelize, DataTypes) {
    var Downvotes = sequelize.define('Downvotes', {
        userId: {
            type: DataTypes.INTEGER,
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
    Downvotes.associate = function (models) {
        Downvotes.belongsTo(models.Recipes, {
            foreignKey: 'recipeId',
            onDelete: 'CASCADE'
        });
        Downvotes.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Downvotes;
};