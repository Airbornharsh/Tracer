const bodyParser = require("body-parser");
const express = require("express");
const DbConnect = require("./config/Database_config");
const Routes = require("./Routes");

const app = express();

app.use(bodyParser.json());

Routes(app);

app.use("*", (req, res, next) => {
  res.send("404 Not Found");
});

DbConnect();

app.listen("4000", () => {
  console.log("Server Started At 4000");
});
