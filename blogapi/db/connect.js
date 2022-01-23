const mongoose = require("mongoose");

const connectToDb = (URL) => {
  mongoose.connect(URL);
  console.log("Connected To Db");
};

module.exports = connectToDb;
