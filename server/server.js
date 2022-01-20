const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricsFinder = require('lyrics-finder');
const SpotifyWebApi = require('spotify-web-api-node');  // Wrapper for the Spotify Web Api

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
/ Obtains a refreshed Access Token
*/
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const credentials = {
        redirectUri: 'http://localhost:3000',
        clientId: 'f4ac31f857c64234a172c74f9bd21cb8',
        clientSecret: 'b3bd41e82ac942a9a9a2d13164d6d902',
        refreshToken
    };
    const spotifyApi = new SpotifyWebApi(credentials);

    spotifyApi
    .refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        });
    })
    .catch((err) => {
        //console.log(err);
        res.sendStatus(400)
    });
});

/*
/ Obtains the initial Access Token => req and res store the data for the request and response objects respectively
*/
app.post('/login', (req, res) => {
    const code = req.body.code;
    const credentials = {
        redirectUri: 'http://localhost:3000',
        clientId: 'f4ac31f857c64234a172c74f9bd21cb8',
        clientSecret: 'b3bd41e82ac942a9a9a2d13164d6d902'
    };
    const spotifyApi = new SpotifyWebApi(credentials);

    /*
    / Returns the res.json output of this onto the URL: http://localhost:3001/login
    */
    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    })
    .catch(() => {
        res.sendStatus(400)
    });
});

app.get('/lyrics', async (req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found";
    res.json({
        lyrics
    });
});

/*
/ The server's base URL would be https://localhost:3001
*/
app.listen(3001);

/*
/ The credentials used are from the Development app's Client Id and Secret
*/