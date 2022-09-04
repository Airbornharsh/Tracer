const express = require("express");
const Get = require("./controllers/Get");
const ExpenseGet = require("./controllers/Expenses/ExpenseGet");
const ExpensePut = require("./controllers/Expenses/ExpensePut");
const ExpensesGet = require("./controllers/Expenses/ExpensesGet");
const ExpensesCategoryGet = require("./controllers/Expenses/ExpensesCatgoryGet");
const ExpensesPost = require("./controllers/Expenses/ExpensesPost");
const Register = require("./controllers/Auth/Register");
const Login = require("./controllers/Auth/Login");
const authenticateToken = require("./middlewares/authenticateToken");
const ChangePassword = require("./controllers/Auth/ChangePassword");
const RegisterOtpVerify = require("./controllers/Auth/RegisterOtpVerify");

const Router = express.Router();

Router.get("/", Get);
Router.post("/user/register", Register);
Router.post("/user/registerotpverify", RegisterOtpVerify);
Router.post("/user/login", Login);
Router.put("/user/changepassword", authenticateToken, ChangePassword);
Router.post("/expenses", authenticateToken, ExpensesPost);
Router.get("/expenses", authenticateToken, ExpensesGet);
Router.get(
  "/expenses/category/:categoryId",
  authenticateToken,
  ExpensesCategoryGet
);
Router.get("/expense/:id", authenticateToken, ExpenseGet);
Router.put("/expense/:id", authenticateToken, ExpensePut);

module.exports = Router;
