var express = require('express');
var user = require('./routes/user');
var playlist = require('./routes/playlist');
var userDetails = require('./routes/userDetails');
var spotify = require('./routes/spotify');
var feeds = require('./routes/feeds');

function api(){
    const app = express.Router();
    user(app);
    playlist(app);
    userDetails(app);
    spotify(app);
    feeds(app);
    return app;

}


module.exports = api;