import { useState, useEffect } from 'react';

const useTrackPlaying = (track, playingTrack) => {
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        (track?.uri === playingTrack?.uri) ? setPlaying(true) : setPlaying(false);
    });
    return playing;
}

export default useTrackPlaying;
