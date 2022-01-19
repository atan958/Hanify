import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

import useAuth from '../login/useAuth'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import Home from './Home'
import Profile from './Profile'

import '../../../css/dashboard.css'

const spotifyApi = new SpotifyWebApi({
    clientId: 'f4ac31f857c64234a172c74f9bd21cb8',
});

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState([]);

    const [showNavBar, setShowNavBar] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showHome, setShowHome] = useState(true);
    const [showLyrics, setShowLyrics] = useState(false);

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
    / Sets the Access Token whenever the useAuth hook produces output
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

    const renderLyrics = () => {
        return (
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
        );
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
    }

    /*
    / 
    */
    const clearSearch = () => {
        setShowLyrics(true);
        setShowHome(false);
        setShowProfile(false);
        setSearch("");
    }

    const displayHome = () => {
        setShowLyrics(false);
        setShowHome(true);
        setShowProfile(false);
        setSearch("");
    }

    const displayProfile = () => {
        setShowLyrics(false);
        setShowHome(false);
        setShowProfile(true);
        setSearch("");
    }

    return (
        <Container className="d-flex flex-column py-4 content-container-container-bg" style={{ height: '100vh' }}>
            <div className="nav-bar-container" onMouseOver={() => { setShowNavBar(true) }} onMouseLeave={() => { setShowNavBar(false) }}>
                <Form.Control 
                    type="search" 
                    placeholder="Search Songs/Artists" 
                    value={search} 
                    onChange={(e) => { 
                        setSearch(e.target.value) 
                    }} 
                />
                {showNavBar && 
                    <div className="btn-group fade-in-anm">
                        <div className="mx-2 my-3 nav-btn" onClick={displayHome}>
                            <img src={require('../../../assets/home.png')} className="nav-img"/>
                        </div>
                        <div className="mx-2 my-3 nav-btn" onClick={displayProfile}>
                        <img src={require('../../../assets/user.png')} className="nav-img"/>
                        </div>
                        <div className="mx-2 my-3 nav-btn" onClick={clearSearch}>
                            <img src={require('../../../assets/song-lyrics.png')} className="nav-img"/>
                        </div>
                    </div>
                }
            </div>
            <div className="flex-grow-1 my-2 content-container-bg" style={{ overflowY: "auto", overflowX: "hidden" }}>
                {renderResults()}
                {(showLyrics && searchResults.length === 0) && ((lyrics.length === 0) ? 'No Song Selected' : (renderLyrics()))}
                {(showProfile && searchResults.length === 0) && <Profile accessToken={accessToken}/>}
                {(showHome && searchResults.length === 0) && <Home />}
            </div>
            <div>
                <Player accessToken={accessToken} track={playingTrack} />
            </div>
        </Container>
    )
}


/*
/ Helper Method: Separates the lyrics into their own divs
*/
const splitLyricsByLine = (lyrics) => {
    return lyrics.split("\n");
}