const withAuth = require('../middleware');
var querystring = require('querystring');
var request = require('request');
const User = require('../../models/User');

const client_id = '93a6e3ba310e4b55895c01a627238018';
const client_secret = '29fbc46f70bb4912826a4ca5df80b78b';
const redirect_uri = 'http://localhost:7373/spotifyCallback'

const stateKey = 'spotify_auth_state';

const generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports = async function (server) {

  server.get('/spotifyLink', withAuth, function(req, res) {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

  server.get('/spotifyCallback', withAuth, function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

          var access_token = body.access_token,
              refresh_token = body.refresh_token;

          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          request.get(options, async function(error, response, body) {
            const user = await User.findOne({email: req.email});
            user.accessToken = access_token;
            user.refreshToken = refresh_token;
            user.spotifyId = body.id;
            user.spotDisplayName = body.display_name;
            user.spotProfileImage = body.images[0].url;
            console.log(user);
            await user.save()
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect('http://localhost:3000/');
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });

}