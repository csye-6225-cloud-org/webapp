const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      id: {
        primaryKey: true,
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
    });
  
    return User;
  };