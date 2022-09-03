const expenses = require("../../models/expenses");

const ExpensesGet = async (req, res, next) => {
  try {
    const data = await expenses.find({ emailId: req.user.emailId });
    res.send(data);
  } catch (e) {
    console.log(e);
    // res.send(e);
  }
};

module.exports = ExpensesGet;
