const expenses = require("../../models/expenses");

const ExpensePut = async (req, res) => {
  if (req.params.id.length !== 24) {
    return res.status(400).send("Wrong Expense Id");
  }

  try {
    if (req.body.title) {
      await expenses.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
      });
    } else if (req.body.amount) {
      await expenses.findByIdAndUpdate(req.params.id, {
        amount: req.body.amount,
      });
    }

    res.send("Updated");
  } catch (e) {
    console.log(e);
  }
};

module.exports = ExpensePut;
