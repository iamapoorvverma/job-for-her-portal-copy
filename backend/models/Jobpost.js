const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobPostSchema = new Schema({
  organization: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  stipend: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  techStack: {
    type: String,
  },
  applylink: {
    type: String,
  },
});

module.exports = JobPost = mongoose.model("jobs", JobPostSchema);
