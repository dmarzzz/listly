const Playlist = require('../../models/Playlist.js');
const User = require('../../models/User.js');
const UserLike = require('../../models/UserLike.js');
const withAuth = require('../middleware');
const mongoose = require('mongoose');

module.exports = function (server) {

  server.post('/likePlaylist', async function(req, res) {
    const id = mongoose.Types.ObjectId(req.query.id);
    // Manually setting while withAuth is resolved
    req.email = 'test'

    try{
      let user = await User.findOne({email: req.email});
      let like = new UserLike({
        playlistId: id,
        upLike: true,
        userId: user._id
      });
      console.log(like);
      user.likes.push(like._id);
      await Playlist.findOneAndUpdate({_id: id}, {
        $inc: {likes: 1}
      });
      user.save()
      like.save()
      res.sendStatus(200);
    } catch (error) {
      console.log(error)
      res.sendStatus(500);
    }
  });

  server.post('/unlikePlaylist', async function(req, res) {
    const id = mongoose.Types.ObjectId(req.query.id);
    // Manually setting while withAuth is resolved
    req.email = 'test'

    try{
      let user = await User.findOne({email: req.email});
      console.log(user._id)
      let like = await UserLike.findOne({userId: user._id, playlistId: id});
      await like.deleteOne();
      res.sendStatus(200);
    } catch (error) {
      console.log(error)
      res.sendStatus(500);
    }
  });

  server.post('/followUser',  async function(req, res) {
    const id = req.query.id;
    // Manually setting while withAuth is resolved
    req.email = 'other'

    try {
      await User.findOneAndUpdate({email: req.email}, {
        $push: {following: id}
      });
      await User.findOneAndUpdate({_id: id}, {
        $inc: {followers: 1}
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error)
      res.sendStatus(500);
    }
  });

  server.post('/unfollowUser', async function(req, res) {
    const id = req.query.id
    // Manually setting while withAuth is resolved
    req.email = 'test'

    try {
      await User.findOneAndUpdate({email: req.email}, {
        $pullAll: {following: [ id ]}
      })
      await User.findById({_id: id}, function(err, result){
        if (err){
          console.log(err);
          return res.send(500);
        }
        result.followers = result.followers - 1;
        if (result.followers < 0) result.followers = 0
        result.save();
      })
      res.sendStatus(200);
    } catch (error) {
      console.log(error)
      res.sendStatus(500);
    }
  })

}