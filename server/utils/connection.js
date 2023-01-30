const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const db = mongoose.connection;

    db.on("open", () => {
      console.log("Connected to db successfully");
    });

    db.on("error", (error) => {
      console.log("Error in db connection" + error);
    });
    await mongoose.connect("mongodb://127.0.0.1:27017/balaji-store");
  } catch (error) {
    console.error(error);
  }
};
