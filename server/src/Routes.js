const ExpenseGet = require("./controllers/Expenses/ExpenseGet");
const ExpensePut = require("./controllers/Expenses/ExpensePut");
const ExpensesGet = require("./controllers/Expenses/ExpensesGet");
const ExpensesPost = require("./controllers/Expenses/ExpensesPost");
const Get = require("./controllers/Get");

const Routes = (app) => {
  app.get("/", Get);
  app.post("/expenses", ExpensesPost);
  app.get("/expenses", ExpensesGet);
  app.get("/expense/:id", ExpenseGet);
  app.put("/expense/:id", ExpensePut);
};

module.exports = Routes;
