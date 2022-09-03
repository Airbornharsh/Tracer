require("dotenv").config();
const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

const DbConnect = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB Connected");
  } catch (e) {
    console.log(e);
  }
};

module.exports = DbConnect; 
