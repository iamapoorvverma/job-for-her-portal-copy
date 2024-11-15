const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  contact: {
    type: Number,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  workEx: {
    type: Number,
    required: false,
  },
  breakTime: {
    type: String,
    required: false,
  },
  workDomain: {
    type: String,
    required: false,
  },
  workHours: {
    type: String,
    required: false,
  },
  techStack: {
    type: String,
    required: false,
  },
  resume: {
    type: String,
    required: false,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
