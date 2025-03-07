const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const getMongo = () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("MongoDb Runing");
  } catch (error) {
    console.log("MongoDb Err", error);
  }
};

module.exports = getMongo;
