const router = require('express').Router();

const Users = require("../users/users-model");


router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body;

  Users.add(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error adding user to the database", err
      })
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
