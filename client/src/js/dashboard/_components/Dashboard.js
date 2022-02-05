import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import axios from 'axios'

import useAuth from '../../login/useAuth'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import Home from '../home/_components/Home'
import Profile from '../profile/_components/Profile'
import Lyrics from '../lyrics/Lyrics'
import useSearchResults from '../_hooks/useSearchResults'
import useShowDashContent from '../_hooks/useShowDashContent'
import useSpotifyWebApi from '../_hooks/useSpotifyWebApi'


import '../../../css/dashboard.css'

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");

    const spotifyWebApi = useSpotifyWebApi(accessToken);

    const searchResults = useSearchResults(search, accessToken, spotifyWebApi);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState([]);

    const [showNavBar, setShowNavBar] = useState(false);
    const [
        showProfile, 
        showHome, 
        showLyrics, 
        displayProfile, 
        displayHome, 
        displayLyrics
    ] = useShowDashContent(setSearch);

    /*
    / Acquires the lyrics for the currently playing track
    */
    useEffect(() => {
        if(!playingTrack) return;
        console.log(playingTrack);
        console.log(playingTrack.artist);
        axios
        .get('http://localhost:3001/lyrics', {
            params: {
                track: playingTrack.title ?  playingTrack.title : playingTrack.name,
                artist: playingTrack.artist ? playingTrack.artist : playingTrack.artists[0]?.name,
            }
        })
        .then((res) => {
            setLyrics(splitLyricsByLine(res.data.lyrics));
            console.log('Changed Lyrics:');
            console.log(res.data.lyrics);
        });
    }, [playingTrack]);

    /*
    / Displays the songs/artists which match the search
    */
    const renderResults = () => {
        return searchResults.map((track) => { 
            return <TrackSearchResult 
                        track={track} 
                        key={track.uri} 
                        chooseTrack={chooseTrack} 
                        displayLyrics={displayLyrics}
                        playingTrack={playingTrack}
                    />
        });
    }

    /*
    / Sets the currently playing track from any displayed tracks 
    */
    const chooseTrack = (track) => {
        setPlayingTrack(track);
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
                        <div className="mx-2 my-3 nav-btn" onClick={displayLyrics}>
                            <img src={require('../../../assets/song-lyrics.png')} className="nav-img"/>
                        </div>
                    </div>
                }
            </div>
            <div className="flex-grow-1 my-2 content-container-bg" style={{ overflowY: (showProfile && search.length === 0) ? "hidden" : "auto", overflowX: "hidden" }}>
                {renderResults()}
                {(showLyrics && searchResults.length === 0) && ((lyrics.length === 0) ? 'No Song Selected' : <Lyrics lyrics={lyrics}/>)}
                {(showProfile && searchResults.length === 0) && <Profile accessToken={accessToken} chooseTrack={chooseTrack} playingTrack={playingTrack}/>}
                {(showHome && searchResults.length === 0) && <Home />}
            </div>
            <div>
                <Player accessToken={accessToken} track={playingTrack}/>
            </div>
        </Container>
    )
}

export default Dashboard;

/*
/ Helper Method: Separates the lyrics into their own divs
*/
const splitLyricsByLine = (lyrics) => {
    return lyrics.split("\n");
}