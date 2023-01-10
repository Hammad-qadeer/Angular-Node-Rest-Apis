const sequelize = require('../config/db.config')
const {DataTypes } = require("sequelize");

const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.INTEGER
  },
  cnic: {
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING
  }
});

module.exports = User;