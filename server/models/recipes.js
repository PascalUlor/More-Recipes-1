/** Define recipes database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Recipes model
 */
export default (sequelize, DataTypes) => {
    const Recipes = sequelize.define('Recipes', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false
        },
        procedures: {
            type: DataTypes.STRING,
            allowNull: false
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
                key: 'id',
                as: 'userId',
            }
        }
    });
    Recipes.associate = (models) => {
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
        Recipes.hasMany(models.Upvotes, {
            foreignKey: 'recipeId'
        });
        Recipes.hasMany(models.Downvotes, {
            foreignKey: 'recipeId'
        });
    };
    return Recipes;
};