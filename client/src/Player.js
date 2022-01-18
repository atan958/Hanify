import { useState, useEffect } from 'react'

import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, track }) {
    const [play, setPlay] = useState(false);
    const [trackUri, setTrackUri] = useState([]);

    useEffect(() => {
        track && setTrackUri([track.uri]);
        setPlay(true);
    }, [track]);

    console.log(trackUri);

    if (!accessToken) return null;
    return (
        <SpotifyPlayer 
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) {
                    setPlay(false);
                    setTrackUri([]);
                }
            }}
            play={play}
            uris={trackUri}
            styles={{
                activeColor: '#fff',
                bgColor: 'gray',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1e90ff',
                sliderTrackColor: '#b0c4de',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
              }}
            style={{

            }}
        />
    )
}

// Note: Callback is called everytime the song finishes, changes, starts and paused? => i.e. anytime the state of the player changes
