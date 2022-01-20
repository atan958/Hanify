import usePlaylistContent from './usePlaylistContent';

const PlaylistContent = ({ accessToken, selectedPlaylist, hideContent, choosePlaylistTrack }) => {
    const playlistContent = usePlaylistContent(accessToken, selectedPlaylist.tracks.href);
    
    return (
        <div className="overlay" >
            <div className="wow-container">
                <div className="overlay-content-control-bar">
                    <div className="overlay-playlist-title">{selectedPlaylist.name}</div>
                    <div className="hide-overlay-btn" onClick={hideContent}>&times;</div>
                </div>
                <div className="d-flex flex-column other overlay-content">
                    {playlistContent ? playlistContent.items.map((item) => {
                        return (
                            <div className="my-2 d-flex p-2 fade-in-anm playlist-item" onClick={() => { choosePlaylistTrack(item.track) }}>
                                <div><img src={item.track.album.images[0].url} style={{ width: '64px', height: '64px'}}/></div>
                                <div className="mx-3 my-3">{item.track.name}</div>
                            </div>
                        );
                    }) : "Loading..."}
                </div>
            </div>
        </div>
  );
};

export default PlaylistContent;
