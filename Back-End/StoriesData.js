const mongoose = require('mongoose')

const StoriesSchema = new mongoose.Schema({
    img: String,
    country: String,
    publish_date: String,
    title: String,
    content: String,
})

module.exports = mongoose.model('stories', StoriesSchema)