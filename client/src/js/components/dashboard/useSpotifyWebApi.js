import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: 'f4ac31f857c64234a172c74f9bd21cb8',
});

const useSpotifyWebApi = (accessToken) => {
    /*
    / Sets the Access Token whenever the useAuth hook re-states
    */
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

  return spotifyApi;
};

export default useSpotifyWebApi;
