const mongoose = require('mongoose');
const User = require('./User.js');
const Playlist = require('./Playlist.js');

const UserLikeSchema = new mongoose.Schema({

  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  },

  upLike: {
    type: Boolean,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

},{timestamps: true});

UserLikeSchema.pre('deleteOne', {document: true}, async function(next) {
  console.log(this);
  await User.updateOne({_id: this.userId}, {$pull: {likes: this._id}});
  await Playlist.updateOne({_id: this.playlistId}, {$inc: {likes: -1}});
  next();
});

module.exports = mongoose.model('UserLike', UserLikeSchema);