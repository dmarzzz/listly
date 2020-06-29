const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({

  spotifyID: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: false
  },

  // Album details
  albumName: String,
  albumID: String,
  albumCover: String,

  // Artist information. Currently not handling multiple artist. Will just do first
  artistName: String,
  artistID: String,

  duration: {
    type: String,
    required: true
  },

  spotifyLink: String,
  popularity: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Track', TrackSchema)