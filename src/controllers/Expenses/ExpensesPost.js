const expenses = require("../../models/expenses");

const ExpensesPost = async (req, res, next) => {
  try {

    const Expense = new expenses({
      amount: req.body.amount,
      title: req.body.title,
      time: Date.now(),
      category: req.body.category.toLowerCase(),
      emailId: req.user.emailId,
    });
    const data = await Expense.save();

    res.send(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = ExpensesPost;
