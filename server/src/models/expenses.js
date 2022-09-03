const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  time: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Expenses", expensesSchema);
