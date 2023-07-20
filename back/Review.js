const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    animeTitle: {
        type: String,
        required: true
    },
    currentEpisode: {
        type: Number,
        required: true
    },
    animePicture: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    recommended: {
        type: Boolean,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Review", reviewSchema)