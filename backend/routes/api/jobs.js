const express = require("express");
const router = express.Router();
const JobPost = require("../../models/Jobpost");

router.post("/add", (req, res) => {
  const newJobPost = new JobPost({
    organization: req.body.organization,
    type: req.body.type,
    mode: req.body.mode,
    location: req.body.location,
    role: req.body.role,
    stipend: req.body.stipend,
    desc: req.body.desc,
    techStack: req.body.techstack,
    applylink: req.body.applylink,
  });
  newJobPost
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.post("/getByOrg", (req, res) => {
  const org = req.body.body.organization;
  JobPost.find({ organization: org }).then((data, err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getAll", (req, res) => {
  JobPost.find({}).then((data, err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
module.exports = router;
