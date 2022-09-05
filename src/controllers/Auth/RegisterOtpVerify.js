const jwt = require("jsonwebtoken");
const user = require("../../models/user");

const RegisterOtpVerify = async (req, res, next) => {
  try {
    if (!req.body.accessToken) return res.sendStatus(401);

    let tempUser;
    let tempErr;

    jwt.verify(req.body.accessToken, process.env.JWT_SECRET, (err, temp) => {
      tempUser = temp;
      tempErr = err;
    });

    if (tempErr) return res.send(tempErr.message);

    if (req.body.otp !== tempUser.otp.toString()) return res.send("Wrong Otp");

    const newUser = new user({
      emailId: tempUser.emailId,
      name: tempUser.name,
      income: tempUser.income || null,
      password: tempUser.password,
    });

    const data = await newUser.save();
    res.send(data);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
};
module.exports = RegisterOtpVerify;
