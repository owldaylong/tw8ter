'use strict';
const {
  Model
} = require('sequelize');
const hashPassword = require('../helpers/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Fill the username'},
        notEmpty: {msg: 'Fill the username'},
        max: {
          args: [15],
          msg: 'Maximum allowed characters are 15'
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Fill the email'},
        notEmpty: {msg: 'Fill the email'},
        isEmail: {msg: 'Please type in the correct email format'}
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Fill the password'},
        notEmpty: {msg: 'Fill the password'},
        max: {
          args: [15],
          msg: 'Maximum allowed password are 15'
        },
        min:{
          args: [8],
          msg: 'Minimum allowed password are 8'
        }
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Pick the role'},
        notEmpty: {msg: 'Pick the role'},
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) =>{
    user.password = hashPassword(user.password)
  })
  return User;
};