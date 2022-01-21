import { useEffect, useState } from 'react'

import '../../../css/search-result.css'

export default function TrackSearchResult({ track, chooseSearchTrack, clearSearch, playingTrack }) {
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        (track?.uri === playingTrack?.uri) ? setPlaying(true) : setPlaying(false);
    });

    const handlePlay = () => {
        chooseSearchTrack(track)
    }
    
    return (
        <div 
            className={`d-flex m-2 align-items-center fade-in-anm result-container ${playing && 'result-container-selected'}`}
            style={{ cursor: 'pointer'}}
            onClick={handlePlay}    
        >
            <img className="m-2" src={track.albumUrl} style={{ height: '64px', width: '64px' }}/>
            <div className="m-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
            {playing && (
                <>
                <div className="position-absolute end-0 shaker" style={{ marginRight: '30px' }}>
                    <div className="avatar">
                        <img src={require('../../../assets/musical-note.png')} />
                    </div>
                </div>
                <div className="show-lyrics-btn show-lyrics-btn-text-centered" onClick={clearSearch}>LYRICS</div>
                </>
            )} 
        </div>
    )
}
