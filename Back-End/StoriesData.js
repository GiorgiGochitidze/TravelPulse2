const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  img: String,
  country: String,
  publish_date: String,
  title: String,
  content: String,
  liked: {
    type: Array,
    default: 0,
  },
  author: String,
});

module.exports = mongoose.model("Stories", storySchema);
