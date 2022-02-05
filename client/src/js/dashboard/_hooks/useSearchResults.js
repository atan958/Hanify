import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'


const useSearchResults = (search, accessToken, spotifyWebApi) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (!search) { setSearchResults([]); return };
        if (!accessToken) return;

        let cancel = false;
        spotifyWebApi
        .searchTracks(search)
        .then((res) => {
            /*
            / Cancels the mounting of the returned search data => given a new request was made before the current one's response was received
            */
            if (cancel) return;
            const tracks = res.body.tracks.items.map((track) => {
                /*
                / Gets the album image with the smallest size
                */
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                return (smallest.height > image.height) ? image  : smallest;
                }, track.album.images[0]);

                return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
                }
            });
            setSearchResults(tracks);
        });

        /*
        / Callback (executed before re-effecting)
        */
        return (() => cancel = true);
    }, [search, accessToken]);

  return searchResults;
};

export default useSearchResults;
