const Playlist = require('../../models/Playlist.js');
const PlaylistTrack = require('../../models/PlaylistTrack.js');
const Track = require('../../models/Track.js');
const mongoose = require('mongoose');

function parsePlaylistTrack(json){
  
}

function parseTrack(json){

  const track = new Track({
    spotifyID: json.id,
    name: json.name,
    albumName: json.album.name,
    albumID: json.album.id,
    albumCover: json.album.images[0].url,
    artistName: json.artists[0].name,
    artistID: json.artists[0].id,
    duration: json.duration_ms,
    spotifyLink: json.external_urls.spotify,
    popularity: json.popularity
  })

  return track;
}

module.exports.parsePlaylist = async (json, userID) => {

  //let trackID = json.tracks.items.map(track => track.track.id)
  let duration = 0;

  let trackID = json.tracks.items.map( async trackJSON => {
    const dub = await (Track.findOne({spotifyID: trackJSON.track.id}).then(async(track, error) => {
      if(error) {
        console.log(error);
      }
      if(track) {
        duration += track.duration;
        const playlistTrack = new PlaylistTrack({
          addedAt: trackJSON.added_at,
          addedBy: trackJSON.added_by.id,
          track: track._id
        })
        const ret = await playlistTrack.save().then((res, err) => {
          if(err) {
            console.log('Error creating Playlist Track for existing Track', err)
          } else {
            return res._id
          }
        })
        return ret
      } else {
        const pTrack = await parseTrack(trackJSON.track).save().then(async (track, err) => {
          if(err){
            console.log(err)
          } else {
            duration += track.duration;
            const playlistTrack = new PlaylistTrack({
              addedAt: trackJSON.added_at,
              addedBy: trackJSON.added_by.id,
              track: track._id
            })
            const ret = await playlistTrack.save().then((res, err) => {
              if(err) {
                console.log('Error creating playlist track', err)
              } else {
                return res._id
              }
            })
            return ret;
          }
        })
        return pTrack;
      }
    }))
    return dub;
  });

  const results = await Promise.all(trackID)

  const playlist = new Playlist({
    spotifyID: json.id,
    collaborative: json.collaborative,
    description: json.description,
    followers: json.followers.total,
    name: json.name,
    image: json.images[0].url,
    public: json.public,
    tracks: results,
    preview: results.slice(0,5),
    url: json.external_urls.spotify,
    owner: json.owner.display_name,
    ownerSpotifyID: json.owner.id,
    ownerID: userID,
    duration: duration
  });

  return playlist;
}