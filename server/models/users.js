/** @description Users database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Users model
 */
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
          args: [4, 25],
          msg: 'Username must be atleast 4 to 25 characters'
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
  Users.associate = (models) => {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Reviews, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Favorites, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Votes, {
      foreignKey: 'userId'
    });
  };
  return Users;
};
