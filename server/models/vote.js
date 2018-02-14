/** Defines Upvote database model and foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} The Upvote model
 */
export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipe',
        key: 'id'
      }
    },
    vote: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ['upvote', 'downvote']
          ],
          msg: 'Must be a string of either upvote or downvote'
        }
      }
    }
  });
  Vote.associate = (models) => {
    Vote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Vote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Vote;
};
