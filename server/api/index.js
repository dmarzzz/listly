var express = require('express');
var user = require('./routes/user');
var playlist = require('./routes/playlist');
var spotifyFunctions = require('./routes/spotifyFunctions');
function api(){
    const app = express.Router();
    user(app);
    playlist(app);
    spotifyFunctions(app);
    return app;

}


module.exports = api;