import './css/search-result.css'

export default function TrackSearchResult({ track, chooseTrack, clearSearch }) {
    const handlePlay = () => {
        chooseTrack(track)
    }
    
    return (
        <div 
            className={`d-flex m-2 align-items-center result-container ${track.playing && 'result-container-selected bg-light'}`}
            style={{ cursor: 'pointer'}}
            onClick={handlePlay}    
        >
            <img className="m-2" src={track.albumUrl} style={{ height: '64px', width: '64px' }}/>
            <div className="m-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
            {track.playing && (
                <>
                <div className="position-absolute end-0 shaker" style={{ marginRight: '30px' }}>
                    <div className="avatar">
                        <img src={require('./assets/musical-note.png')} />
                    </div>
                </div>
                <div className="show-lyrics-btn show-lyrics-btn-text-centered" onClick={clearSearch}>LYRICS</div>
                </>
            )} 
        </div>
    )
}
