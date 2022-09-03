const express = require("express");
const Get = require("./controllers/Get");
const ExpenseGet = require("./controllers/Expenses/ExpenseGet");
const ExpensePut = require("./controllers/Expenses/ExpensePut");
const ExpensesGet = require("./controllers/Expenses/ExpensesGet");
const ExpensesCategoryGet = require("./controllers/Expenses/ExpensesCatgoryGet");
const ExpensesPost = require("./controllers/Expenses/ExpensesPost");

const Router = express.Router();

Router.get("/", Get);
Router.post("/expenses", ExpensesPost);
Router.get("/expenses", ExpensesGet);
Router.get("/expenses/category/:categoryId", ExpensesCategoryGet);
Router.get("/expense/:id", ExpenseGet);
Router.put("/expense/:id", ExpensePut);

module.exports = Router;
