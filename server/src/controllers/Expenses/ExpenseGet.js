const expenses = require("../../models/expenses");

const ExpenseGet = async (req, res) => {
  try {
    if (req.params.id.length !== 24) {
      return res.status(400).send("Wrong Expense Id");
    }
    const data = await expenses.findOne({
      _id: req.params.id,
      emailId: req.user.emailId,
    });
    res.send(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = ExpenseGet;
