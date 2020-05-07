const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  
  commentText: {
    type: String,
    required: true
  },

  userID: {
    type: String,
    required: true
  },

  playlistID: {
    type: String,
    required: true
  }

},{timestamps: true});

module.exports = mongoose.model('Comment', CommentSchema);