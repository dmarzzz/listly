const mongoose = require('mongoose');

const PlaylistTrackSchema = new mongoose.Schema({

  addedAt: {
    type: Date,
    required: true
  },

  addedBy: {
    // User ID
    type: String
  },

  track: {
    // MongoDB Track ID which will hold the spotify ID
    type: String,
    required: true
  }

})

module.exports = mongoose.model('PlaylistTrack', PlaylistTrackSchema);