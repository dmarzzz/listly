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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track'
  }

})

module.exports = mongoose.model('PlaylistTrack', PlaylistTrackSchema);