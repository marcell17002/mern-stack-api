const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log("token :", bearerHeader);
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, config.secret, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      // if everything good, save to request for use in other routes
      req.resultId = decoded.id;
      next();
    });
  } else {
    // Forbidden
    res.status(403).send({ auth: false, message: "No token provided." });
  }
};

module.exports = verifyToken;
