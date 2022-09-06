const user = require("../../models/user");

const UserData = async (req, res, next) => {
  try {
    const userData = await user.findOne({ emailId: req.user.emailId });
    res.send(userData);
  } catch (e) {
    res.send(500).send(e.message);
  }
};

module.exports = UserData;
