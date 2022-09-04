const bcrypt = require("bcrypt");
const user = require("../../models/user");

const ChangePassword = async (req, res, next) => {
  try {
    const tempUser = await user.findOne({ emailId: req.user.emailId });
    if (!tempUser) {
      return res.send(`No Such ${req.user.emailId} Id Exist`);
    }

    const passwordSame = await bcrypt.compare(
      req.body.password,
      tempUser.password
    );
    if (!passwordSame) {
      return res.send("Wrong Password");
    }

    const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
    const updatedUser = await user.findByIdAndUpdate(tempUser._id, {
      password: hashPassword,
    });
    res.send(updatedUser); 
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
};

module.exports = ChangePassword;
