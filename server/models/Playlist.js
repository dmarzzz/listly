const mongoose = require('mongoose');
const Comment = require('./Comment');
const PlaylistTrack = require('./PlaylistTrack');

const PlaylistSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

})

module.exports = mongoose.model('Playlist', PlaylistSchema)