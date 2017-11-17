/** Defines Upvotes database model and foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} The Upvotes model
 */
export default (sequelize, DataTypes) => {
    const Votes = sequelize.define('Votes', {
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
        },
        vote: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Votes.associate = (models) => {
        Votes.belongsTo(models.Recipes, {
            foreignKey: 'recipeId',
            onDelete: 'CASCADE'
        });
        Votes.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Votes;
};