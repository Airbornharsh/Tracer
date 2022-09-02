const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Expenses", expensesSchema);
