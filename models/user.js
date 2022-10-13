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
    static createUser(username, email, password, role){
      let result = User.create({ username, email, password, role })
      return result
    }
    showStatus(){
      if (this.role === 'Admin') {
        return 'Admin'
      }else{
        return ''
      }
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Username has been taken'},
      validate: {
        notNull: {msg: 'Fill the username'},
        notEmpty: {msg: 'Fill the username'},
        isLength(x){
          if (x.length > 15) {
            throw new Error('Maximum allowed characters are 15')
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Email has already been used'},
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
        isLength(pass){
          if (pass.length > 15) {
            throw new Error('Maximum allowed password are 15')
          } else if (pass.length < 8) {
            throw new Error('Minimum allowed password are 8')
          }
        },
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