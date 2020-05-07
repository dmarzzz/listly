const Playlist = require('../../models/Playlist.js');

module.exports.parsePlaylist = (json) => {

  console.log("json be : " , json)

  const playlist = new Playlist({
    name: json.name,
  });

  return playlist;
} 