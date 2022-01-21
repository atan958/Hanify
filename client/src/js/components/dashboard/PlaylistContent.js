import useIsTrackPlaying from './useIsTrackPlaying'
import usePlaylistContent from './usePlaylistContent';

const PlaylistContent = ({ accessToken, selectedPlaylist, choosePlaylistTrack, playingTrack }) => {
    const playlistContent = usePlaylistContent(accessToken, selectedPlaylist?.tracks.href);

    return (
        <>
        <div className="selected-playlist-header-container">
            <div className="d-flex flex-column playlist-content-avatar">
                <img src={selectedPlaylist?.images[0].url} className="playlist-content-avatar-img"/>
            </div>
            <div className="d-flex flex-column playlist-content-title">
                {selectedPlaylist ? selectedPlaylist.name.toUpperCase() : 'SELECT PLAYLIST'}
            </div>
        </div>
        <div className="playlist-content-container-hide-scrollbar d-flex flex-column fade-in-anm">
            <div className="d-flex flex-column playlist-content-container playlist-content-bg">
                {playlistContent ? 
                playlistContent.items.map((item) => {
                    return (
                        <PlaylistTrack item={item} choosePlaylistTrack={choosePlaylistTrack} playingTrack={playingTrack}/>
                    );
                }) 
                : 
                selectedPlaylist ?
                     "Loading..."
                     : 
                     <div className="playlist-content-placeholder">
                         Hello There
                     </div>
                }
            </div>
        </div>
        </>
  );
};

export default PlaylistContent;

const PlaylistTrack = ({ item, choosePlaylistTrack, playingTrack }) => {
    const isTrackPlaying = useIsTrackPlaying(item.track, playingTrack);

    return (
        <div className={`my-1 d-flex p-2 fade-in-anm playlist-item align-items-center ${isTrackPlaying && 'playlist-track-playing'}`} onClick={() => { choosePlaylistTrack(item.track) }}>
            <div><img src={item.track.album.images[0].url} style={{ width: '64px', height: '64px'}}/></div>
            <div className="fade-in-anm">
                <div className="mx-3">{item.track.name}</div>
                <div className="mx-3 text-muted">{item.track.artists[0].name}</div>
            </div>
            {isTrackPlaying && (
                <>
                <div className="shaker playlist-track-music-note" style={{ marginRight: '30px' }}>
                    <div className="avatar">
                        <img src={require('../../../assets/musical-note.png')} />
                    </div>
                </div>
                </>
            )} 
        </div>
    );
}
