const mongoose = require('mongoose');
const Comment = require('./Comment');
const PlaylistTrack = require('./PlaylistTrack');

const PlaylistSchema = new mongoose.Schema({

  // The Spotify ID of the playlist for the Spotify API
  spotifyID: {
    type: String,
    required: true
  },

  collaborative: Boolean,
  duration: Number,

  /*
  Can default as the Spotify description but should be editable
  Could possible write the edits to the Spotify side
  */
  description: String,

  followers: {
    type: Number,
    default: 0
  },

  name: {
    type: String,
    required: true
  },

  image: {
    type: String
  },

  public: Boolean,

  // Must create Playlist Track attribute
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlaylistTrack' }],
  preview: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlaylistTrack' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

  url: String,

  rating: {
    type: Number,
    default: 0
  },

  comments: {
    type: Array,
    default: []
  },

  owner: String,
  // The spotify ID of the owner vs the DB id
  ownerSpotifyID: String,
  ownerID: mongoose.Schema.Types.ObjectId

})

module.exports = mongoose.model('Playlist', PlaylistSchema)