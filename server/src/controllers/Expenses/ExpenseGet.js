const expenses = require("../../models/expenses");

const ExpenseGet = async (req, res) => {
  try {
    const data = await expenses.findById(req.params.id);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = ExpenseGet;
