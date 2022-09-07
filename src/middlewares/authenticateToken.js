const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, authUser) => {
    if (err) return res.status(401).send("You Don't Have Access");


    req.user = authUser;
    next();
  });
};

module.exports = authenticateToken;
