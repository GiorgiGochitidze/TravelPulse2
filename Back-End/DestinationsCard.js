const mongoose = require('mongoose')

const Card = new mongoose.Schema({
    img: String,
    place: String,
    city: String,
})

module.exports = mongoose.model('DestinationCards', Card)