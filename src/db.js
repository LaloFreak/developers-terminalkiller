const { Sequelize } = require("sequelize");
const { POSTGRES_STRING } = require("./config/config");

const sequelize = new Sequelize(
    POSTGRES_STRING,
  {
    logging: false,
    native: false,
  }
);

module.exports = { sequelize };
