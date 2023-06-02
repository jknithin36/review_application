const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  // owner parentMovie rating content
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parentMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  content: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
