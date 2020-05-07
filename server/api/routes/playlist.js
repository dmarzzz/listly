const Playlist = require('../../models/Playlist.js');
const mockPlaylist = require('../../mock/mockPlaylist.json');
const playlistParser = require('../parsers/spotifyParser.js');

module.exports = function (server) {

  server.get('/bootstrapPlaylists', async function (req, res, next) {
    try {
      let playlist = await playlistParser.parsePlaylist(mockPlaylist)
      playlist.save() 
    } catch (error) {
      console.log(error)
    }
  })

  server.get('/api/playlistById', async function (req, res, next) {
    let playlistID = req.query.id
    try {
      let response = await Playlist.findOne({ spotifyID: playlistID }).populate({
        path: 'tracks',
        populate: { path: 'track' }
      })
      res.send(response)
    } catch (error) {
      console.log('Error ', err)
      res.status(500).send(error)
    }
  })

  server.get('/api/playlists', async function (req, res, next) {
    try {
      let playlists = await Playlist.find({}).limit(10).populate({
        path: 'tracks',
        populate: { path: 'track' }
      });
      res.json(playlists);
    }
    catch (error) {
      res.status(500).send(error);
    }
  });

  server.put('/api/follow', async function (req, res, next) {
    const currentUser = 'test'
    let userID = req.query.id

    try {
      let update = await User.update({ email: currentUser }, { $push: { following: userID } })
      res.send(update)
    } catch (error) {
      res.status(500)
        .json({
          error: 'Internal error please try again'
        })
    }
  })


}