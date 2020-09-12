/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if(token) {
      jwt.verify(token, secret.jwtSecret, (err, decodedToken))
        if(err) {
          res.status(401).json({
            you: "shall not pass!"
          })
        } else {
          req.decodedJWT = decodedToken;
          next();
        }
  } else {
    throw new Error("invalid login data")
  }
  } catch (err) {
    res.status(401).json({
      error: err.message
    })
  } 
};
