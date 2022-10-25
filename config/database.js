const mongoose = require("mongoose");

class DatabaseConnection {
  static configure() {
    try {
      const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
      mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?authMechanism=DEFAULT`
      );

      mongoose.set("debug", true);
    } catch (error) {
      console.log("error trying connect", error);
    }
  }
}

module.exports = DatabaseConnection;
