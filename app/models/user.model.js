const DataTypes = require('sequelize').DataTypes;
const bcrypt = require("bcrypt");
const { BOOLEAN } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        primaryKey: true,
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
      },
      account_created: {
        type: Sequelize.DATE
      },
      account_updated: {
        type: Sequelize.DATE
      },
      validated: {
        type: Sequelize.BOOLEAN
      },
      email_sent: {
        type: Sequelize.DATE
      },
      email_validation_token: {
        type: Sequelize.STRING
      }
  });
  
    return User;
  };
