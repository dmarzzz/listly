const Playlist = require('../../models/Playlist.js');
const withAuth = require('../middleware');
const User = require('../../models/User');

module.exports = function (server) {

  server.get('/feeds/globalRanking', async function (req, res) {
    try {
      let playlists = await Playlist.find({})
        .sort({likes: -1})
        .limit(100)
        .populate({
          path: 'tracks',
          populate: { path: 'track'}
        });
      playlists.send(playlists);
    } catch (error) {
      console.log('Error obtaining Global Rankings: ', error);
      res.sendStatus(500);
    }
  });

  server.get('/feeds/globalNew', async function (req, res) {
    try {
      let playlists = await Playlist.find({})
        .sort({createdAt: -1})
        .limit(100)
        .populate({
          path: 'tracks',
          populate: { path: 'track'}
        });
      playlists.send(playlists);
    } catch (error) {
      console.log('Error obtaining Global New Playlists: ', error);
      res.sendStatus(500);
    }
  });

  server.get('/feeds/followedUpdates', async function (req, res) {
    req.email = 'other'

    try {
      let user = await User.findOne({email: req.email});
      console.log(user.following);
      let following = await User.find({
        _id: { $in: user.following}
      })
      let playlistIds = following.map(followedUser => followedUser.spotifyId);
      let playlists = await Playlist.find({
        ownerSpotifyID: { $in: playlistIds}
      })//.sort({updatedAt: -1})
        .limit(100);

      console.log(playlistIds);
      res.send(playlists);
    } catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

}