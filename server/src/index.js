require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const DbConnect = require("./config/Database_config");
const Router = require("./Routes");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen("4000", () => {
  console.log("Server Started At 4000");
});
