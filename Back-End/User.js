const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  gmail: String,
  password: String,
  liked: [],
});

module.exports = mongoose.model("Users", userSchema);
