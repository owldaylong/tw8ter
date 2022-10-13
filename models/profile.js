'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    profilePicture: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Fill the first name'},
        notEmpty: {msg: 'Fill the first name'},
        isLength(x){
          if (x.length > 15) {
            throw new Error('Maximum allowed characters are 15')
          }
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Fill the last name'},
        notEmpty: {msg: 'Fill the last name'},
        isLength(x){
          if (x.length > 15) {
            throw new Error('Maximum allowed characters are 15')
          }
        },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};