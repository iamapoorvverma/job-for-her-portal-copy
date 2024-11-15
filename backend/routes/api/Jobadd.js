// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
// const passport = require("passport");

// const JobPost = require("../../models/JobPost");

// router.post("/JobPost", (req, res) => {
// const newJobPost = new JobPost({
//     title: req.body.title,
//     type: req.body.type,
//     mode: req.body.mode,
//     location: req.body.location,
//     role: req.body.role,
//     stipend: req.body.stipend,
//     desc: req.body.desc,
//     techStack: req.body.techStack,
//   });
//   newJobPost
//   .save()
//             .then((user) => res.json(user))
//             .catch((err) => console.log(err));
// });

//   module.exports = router;
