const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const orgs = require("./routes/api/organizations");
const jobs = require("./routes/api/jobs");

// const JobPost = require("./routes/api/JobPost");
const JobPosts = require("./routes/api/Jobadd");
const getOpenings = require("./routes/api/getOpenings");
const getJobs = require("./routes/api/getJobs");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/organizations", orgs);
// app.use("/api/JobPost",JobPost);
// app.use("/api/Jobadd",JobPosts);
// app.use("/api/getOpenings",getOpenings);
// app.use("/api/getJobs",getJobs);
app.use("/api/jobs", jobs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
