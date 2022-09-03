const bcrypt = require("bcrypt");
const user = require("../../models/user");

const Login = async (req, res) => {
  try {
    const tempUser = await user.findOne({ emailId: req.body.emailId });
    if (!tempUser) {
      return res.send(`No Such ${req.body.emailId} Id Exist`);
    }

    const passwordSame = await bcrypt.compare(
      req.body.password,
      tempUser.password
    );

    if (passwordSame) {
      res.send("Success");
    } else {
      res.send("Wrong Password");
    }
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = Login;
