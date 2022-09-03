const bodyParser = require("body-parser");
const express = require("express");
const DbConnect = require("./config/Database_config");
const Router = require("./Routes");

const app = express();

app.use(bodyParser.json());

app.use(Router);

app.use("*", (req, res, next) => {
  res.send("404 Not Found");
});

DbConnect();

app.listen("4000", () => {
  console.log("Server Started At 4000");
});
