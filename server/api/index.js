var express = require('express');
var user = require('./routes/user');
var playlist = require('./routes/playlist');
function api(){
    const app = express.Router();
    user(app);
    playlist(app);
    return app;

}


module.exports = api;