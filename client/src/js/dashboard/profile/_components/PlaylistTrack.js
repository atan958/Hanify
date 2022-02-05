import useIsTrackPlaying from '../../_hooks/useIsTrackPlaying';

const PlaylistTrack = ({ item, chooseTrack, playingTrack }) => {
    const isTrackPlaying = useIsTrackPlaying(item.track, playingTrack);

    return (
        <div className={`my-1 d-flex p-2 fade-in-anm playlist-item align-items-center ${isTrackPlaying && 'playlist-track-playing'}`} onClick={() => { chooseTrack(item.track) }}>
            <div><img src={item.track.album.images[0].url} style={{ width: '64px', height: '64px'}}/></div>
            <div className="fade-in-anm">
                <div className="mx-3">{item.track.name}</div>
                <div className="mx-3 text-muted">{item.track.artists[0].name}</div>
            </div>
            {isTrackPlaying && (
                <>
                <div className="shaker playlist-track-music-note" style={{ marginRight: '30px' }}>
                    <div className="avatar">
                        <img src={require('../../../../assets/musical-note.png')} />
                    </div>
                </div>
                </>
            )} 
        </div>
    );
}

export default PlaylistTrack;