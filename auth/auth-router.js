const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");
const Users = require("../users/users-model");


router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body;

  if(!(user.username && user.password)) {
    res.status(400).json({
      message: "Please complete required fields"
    })
  } else {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
      .then(user => {
        delete user.password
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error creating user"
        })
      })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  if(!(username && password)) {
    res.status(400).json({
      message: "Missing username and/or password"
    })
  } else {
    Users.findBy({ username })
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({
            message: `Welcome, ${user.username}!`, token
          })
        } else {
          res.status(403).json({
            message: "Login credentials incorrect"
          })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Error retrieving login data"
        })
      })
  }
});

module.exports = router;

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secrets.jwtSecret,options)
}

module.exports = router;