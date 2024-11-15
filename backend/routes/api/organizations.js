const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/registerorg");
const validateLoginInput = require("../../validation/loginorg");

// Load User model
const Organization = require("../../models/Organization");

router.post("/", (req, res) => {
  Organization.findOne({ name: req.body.body.name }).then((user) => {
    if (user) {
      return res.json(user);
    } else {
      return res
        .status(400)
        .json({ email: "Organization does not exist" + req.body.body });
    }
  });
});
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Organization.findOne({ name: req.body.name }).then((organization) => {
    if (organization) {
      return res.status(400).json({ name: "Name already exists" });
    } else {
      const newOrg = new Organization({
        name: req.body.name,
        sector: req.body.sector,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newOrg.password, salt, (err, hash) => {
          if (err) throw err;
          newOrg.password = hash;
          newOrg
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const password = req.body.password;

  // Find user by email
  Organization.findOne({ name }).then((org) => {
    // Check if user exists
    if (!org) {
      return res.status(404).json({ namenotfound: "Name not found" });
    }

    // Check password
    bcrypt.compare(password, org.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: org.id,
          name: org.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
