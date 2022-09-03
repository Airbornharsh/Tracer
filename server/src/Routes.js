const express = require("express");
const Get = require("./controllers/Get");
const ExpenseGet = require("./controllers/Expenses/ExpenseGet");
const ExpensePut = require("./controllers/Expenses/ExpensePut");
const ExpensesGet = require("./controllers/Expenses/ExpensesGet");
const ExpensesCategoryGet = require("./controllers/Expenses/ExpensesCatgoryGet");
const ExpensesPost = require("./controllers/Expenses/ExpensesPost");
const Register = require("./controllers/Auth/Register");
const Login = require("./controllers/Auth/Login");

const Router = express.Router();

Router.get("/", Get);
Router.post("/user/register", Register);
Router.post("/user/login", Login);
Router.post("/expenses", ExpensesPost);
Router.get("/expenses", ExpensesGet);
Router.get("/expenses/category/:categoryId", ExpensesCategoryGet);
Router.get("/expense/:id", ExpenseGet);
Router.put("/expense/:id", ExpensePut);

module.exports = Router;
