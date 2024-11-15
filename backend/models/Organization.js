const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sector: {
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
});

module.exports = Organization = mongoose.model("orgs", OrganizationSchema);
