var express = require('express');
var user = require('./routes/user');
var playlist = require('./routes/playlist');
var userDetails = require('./routes/userDetails');
var spotify = require('./routes/spotify');

function api(){
    const app = express.Router();
    user(app);
    playlist(app);
    userDetails(app);
    spotify(app);
    return app;

}


module.exports = api;