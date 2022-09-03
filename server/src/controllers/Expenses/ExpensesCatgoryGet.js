const expenses = require("../../models/expenses");

const ExpensesCategoryGet = async (req, res, next) => {
  try {
    const data = await expenses.find({ category: req.params.categoryId });
    res.send(data);
  } catch (e) {
    console.log(e);
    // res.send(e);
  }
};

module.exports = ExpensesCategoryGet;
