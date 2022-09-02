const mongoose = require("mongoose");

const DB_URI = "mongodb+srv://airbornharsh:Zgxv0oBrdtelMGkB@tracer.wfclbo0.mongodb.net/?retryWrites=true&w=majority";

const DbConnect = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database Connected");
  } catch (e) {
    console.log(e);
  }
};

module.exports = DbConnect;
