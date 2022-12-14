require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../models/user");

const Login = async (req, res) => {
  try {
    const tempUser = await user.findOne({ emailId: req.body.emailId });
    if (!tempUser) {
      return res.status(400).send(`No Such ${req.body.emailId} Id Exist`);
    }

    const passwordSame = await bcrypt.compare(
      req.body.password,
      tempUser.password
    );

    if (!passwordSame) {
      return res.status(401).send("Wrong Password");
    }

    const authUser = { emailId: req.body.emailId };

    const accessToken = jwt.sign(authUser, process.env.JWT_SECRET);
    res.send({ accessToken });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = Login;
