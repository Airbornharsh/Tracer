require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const DbConnect = require("./src/config/Database_config");
const Router = require("./src/Routes");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../../client/build")));

app.use(Router);

app.use("*", (req, res, next) => {
  res.send("404 Not Found");
});

DbConnect();

app.listen("4000", () => {
  console.log("Server Started At 4000");
});
