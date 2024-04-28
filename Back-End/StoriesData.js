const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  img: String,
  country: String,
  publish_date: String,
  title: String,
  content: String,
  likes: {
    type: Number,
    default: 0 // Default value for the likes field is 0
  }
});

const StoriesSchema = mongoose.model('Stories', storySchema);

module.exports = StoriesSchema;
