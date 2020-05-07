const mongoose = require('mongoose');

const UserLikeSchema = new mongoose.Schema({

  playlistID: {
    type: String,
    required: true
  },

  upLike: {
    type: Boolean,
    required: true
  },

},{timestamps: true});

module.exports = mongoose.model('UserLike', UserLikeSchema);