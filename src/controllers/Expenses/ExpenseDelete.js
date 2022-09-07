const expenses = require("../../models/expenses");

const ExpenseDelete = async (req, res, next) => {
  try {
    if (req.params.id.length !== 24) {
      return res.status(400).send("Wrong Expense Id");
    }

    const data = await expenses.findOneAndRemove({
      _id: req.params.id,
      emailId: req.user.emailId,
    });

    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

module.exports = ExpenseDelete;
