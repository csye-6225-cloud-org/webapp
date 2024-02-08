const DataTypes = require('sequelize').DataTypes;
const bcrypt = require("bcrypt");

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
      }
    // }, 
    // {
    //   freezeTableName: true,
    //   instanceMethods: {
    //       generateHash(password) {
    //           return bcrypt.hash(password, bcrypt.genSaltSync(8));
    //       },
    //       validPassword(password) {
    //           return bcrypt.compare(password, this.password);
    //       }
    //   }
  });
  
    return User;
  };
