import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

import useAuth from './useAuth'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'

import './css/dashboard.css'

const spotifyApi = new SpotifyWebApi({
    clientId: 'f4ac31f857c64234a172c74f9bd21cb8',
});

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [userInfo, setUserInfo] = useState();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState([]); console.log(lyrics);

    /*
    / Acquires the lyrics for the currently playing track
    */
    useEffect(() => {
        if(!playingTrack) return;

        axios
        .get('http://localhost:3001/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist,
            }
        })
        .then((res) => {
            setLyrics(splitLyricsByLine(res.data.lyrics));
            console.log('Changed Lyrics:');
            console.log(res.data.lyrics);
        });
    }, [playingTrack]);

    /*
    /
    */
    const splitLyricsByLine = (lyrics) => {
        return lyrics.split("\n");
    }

    /*
    / Acquires the current User's profile information
    */
    useEffect(() => {
        if(!accessToken) return;
        const retrieveUserInfo = async () => {
            const res = await axios.get('	https://api.spotify.com/v1/me', { 
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${accessToken}`
                } 
            });
            const data = res.data;
            setUserInfo(data);
        }
        retrieveUserInfo();
    }, [accessToken]);

    /*
    /
    */
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);


    /*
    / 
    */
    useEffect(() => {
        if (!search) { setSearchResults([]); return };
        if (!accessToken) return;

        let cancel = false;
        spotifyApi
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
                playing: (track.uri === playingTrack?.uri) ? true : false
                }
            });
            setSearchResults(tracks);
        });

        /*
        / Callback (executed before re-effecting)
        */
        return (() => cancel = true);
    }, [search, accessToken]);

    /*
    / Displays the songs/artists which match the search
    */
    const renderResults = () => {
        return searchResults.map((track) => { 
            return <TrackSearchResult 
                        track={track} 
                        key={track.uri} 
                        chooseTrack={chooseTrack} 
                        clearSearch={clearSearch}
                    />
        });
    }

    /*
    / Sets the track which cs current playing on the Player component
    */
    const chooseTrack = (track) => {
        searchResults.forEach((track) => {
            track.playing = false 
        });
        track.playing = true;
        setPlayingTrack(track);
        // setSearch("");
        // setLyrics([]);
    }

    /*
    /
    */
    const clearSearch = () => {
        setSearch("");
    }

    return (
        <Container className="d-flex flex-column py-4 bg-dark" style={{ height: '100vh' }}>
            <Form.Control 
                type="search" 
                placeholder="Search Songs/Artists" 
                value={search} 
                onChange={(e) => { 
                    setSearch(e.target.value) 
                }} 
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto", overflowX: "hidden", backgroundColor: 'white' }}>
                {renderResults()}
                {(searchResults.length === 0) && (
                    <div className="text-center py-4" style={{ whiteSpace: "pre" }}>
                        {lyrics.map((line, index) =>{
                            return (
                                <div className="lyric-line highlight" style={{ animationDuration: `${index*0.1}s` }}>
                                    {line}
                                    <br/>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div>
                <Player accessToken={accessToken} track={playingTrack}/>
            </div>
        </Container>
    )
}
