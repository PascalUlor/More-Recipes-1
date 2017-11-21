'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/** Define recipes database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Recipes model
 */
exports.default = function (sequelize, DataTypes) {
    var Recipes = sequelize.define('Recipes', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Recipe title is required'
                },
                is: {
                    args: /^[a-z ]+$/i,
                    msg: 'Recipe title must only contain letters'
                }
            }
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Recipe ingredients are required'
                },
                len: {
                    args: [20, 1000],
                    msg: 'Recipe ingredients provided must be atleast 20 to 1000 characters'
                }
            }

        },
        procedures: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Recipe procedures are required'
                },
                len: {
                    args: [30, 1000],
                    msg: 'Recipe procedures provided must be atleast 30 to 1000 characters'
                }
            }
        },
        recipeImage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Recipe image is required'
                }
            }
        },
        viewsCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        upvotes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        downvotes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });
    Recipes.associate = function (models) {
        Recipes.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Recipes.hasMany(models.Reviews, {
            foreignKey: 'recipeId'
        });
        Recipes.hasMany(models.Favorites, {
            foreignKey: 'recipeId'
        });
        Recipes.hasMany(models.Votes, {
            foreignKey: 'recipeId'
        });
    };
    return Recipes;
};