import { useState, useEffect } from 'react'

import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, track }) {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        console.log('Track changed');
        console.log(track);
        if (track) setPlay(true);
    }, [track]);

    if (!accessToken) return null;
    return (
        <SpotifyPlayer 
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) {
                    setPlay(false);
                }
            }}
            play={play}
            uris={track? [track.uri] : []}
            styles={{
                activeColor: '#fff',
                bgColor: '#04AA6D',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1e90ff',
                sliderTrackColor: '#b0c4de',
                trackArtistColor: '#ccc',
                trackNameColor: 'black',
              }}
            style={{
            }}
        />
    )
}

// Note: Callback is called everytime the song finishes, changes, starts and paused? => i.e. anytime the state of the player changes
