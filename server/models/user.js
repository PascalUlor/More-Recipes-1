/** @description User database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} User model
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Full name is required'
        },
        is: {
          args: /^[a-z ]+$/i,
          msg: 'Full name must only contain letters'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        len: {
          args: [3, 25],
          msg: 'Username must be atleast 3 to 25 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Email is invalid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Vote, {
      foreignKey: 'userId'
    });
  };
  return User;
};
