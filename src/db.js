const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
   "postgres://postgres:DwKQk4Is3QUrriV@developerkiller-db.flycast:5432",
  {
    logging: false,
    native: false,
  }
);

module.exports = { sequelize };
