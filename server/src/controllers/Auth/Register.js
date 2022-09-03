const bcrypt = require("bcrypt");
const user = require("../../models/user");

const Register = async (req, res, next) => {
  try {
    const tempUser = await user.find({ emailId: req.body.emailId });
    console.log(tempUser);
    if (tempUser[0]) {
      return res.send("Email Id Exist!");
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new user({
      emailId: req.body.emailId,
      name: req.body.name,
      income: req.body.income || null,
      password: hashPassword,
    });
    await newUser.save();
    res.send(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

module.exports = Register;
