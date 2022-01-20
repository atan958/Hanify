import usePlaylistContent from './usePlaylistContent';

const PlaylistContent = ({ accessToken, selectedPlaylist, choosePlaylistTrack }) => {
    const playlistContent = usePlaylistContent(accessToken, selectedPlaylist?.tracks.href);
    
    return (
        <>
        <div className="d-flex flex-column playlist-content-title">
            {selectedPlaylist ? selectedPlaylist.name.toUpperCase() : 'SELECT PLAYLIST'}
        </div>
        <div className="wow-container d-flex flex-column fade-in-anm">
            <div className="d-flex flex-column overlay-content overlay-content-bg">
                {playlistContent ? 
                playlistContent.items.map((item) => {
                    return (
                        <div className="my-1 d-flex p-2 fade-in-anm playlist-item align-items-center" onClick={() => { choosePlaylistTrack(item.track) }}>
                            <div><img src={item.track.album.images[0].url} style={{ width: '64px', height: '64px'}}/></div>
                            <div className="fade-in-anm">
                                <div className="mx-3">{item.track.name}</div>
                                <div className="mx-3 text-muted">{item.track.artists[0].name}</div>
                            </div>
                        </div>
                    );
                }) 
                : 
                selectedPlaylist && "Loading..."
                }
            </div>
        </div>
        </>
  );
};

export default PlaylistContent;

/*
           <div className="overlay-content-control-bar">
                <div className="overlay-playlist-title">{selectedPlaylist.name}</div>
                <div className="hide-overlay-btn" onClick={hideContent}>&times;</div>
            </div>
*/