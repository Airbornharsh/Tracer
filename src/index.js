require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const DbConnect = require("./config/Database_config");
const Router = require("./Routes");
const cors = require("cors");

console.log("Oke");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Router);

app.use("*", (req, res, next) => {
  res.send("404 Not Found");
});

DbConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server Started At ${process.env.PORT}`);
});
