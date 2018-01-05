/** Define Review database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Reviews model
 */
export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    reviewBody: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Review for recipe is required'
        },
        len: {
          args: [4, undefined],
          msg: 'Review provided must be atleast 4 characters'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
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

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Reviews.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Reviews;
};
