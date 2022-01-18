import { useState, useEffect } from 'react'

import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setPlay(true);
    }, [trackUri]);

    if (!accessToken) return null;
    return (
        <SpotifyPlayer 
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri? [trackUri] : []}
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
        />
    )
}

// Note: Callback is called everytime the song finishes, changes, starts and paused? => i.e. anytime the state of the player changes
