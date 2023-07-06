const mongoose = require("mongoose");
const { MONGODB_STRING } = require("../config/config");

module.exports = class DB {
  static connect() {
    mongoose.Promise = global.Promise;
    return mongoose.connect(
      MONGODB_STRING,
      { useNewUrlParser: true }
    )
  }
};
