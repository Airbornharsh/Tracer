require("dotenv").config();
const bcrypt = require("bcrypt");
const user = require("../../models/user");
const { Auth } = require("two-step-auth");
const jwt = require("jsonwebtoken");

const Register = async (req, res, next) => {
  try {
    const tempUser = await user.find({ emailId: req.body.emailId });
    if (tempUser[0]) {
      return res.send("Email Id Exist!");
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      emailId: req.body.emailId,
      name: req.body.name,
      income: req.body.income || null,
      password: hashPassword,
    };

    const data = await Auth(req.body.emailId, "Tracer");

    newUser.otp = data.OTP;

    const accessToken = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.send({ accessToken });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

module.exports = Register;
