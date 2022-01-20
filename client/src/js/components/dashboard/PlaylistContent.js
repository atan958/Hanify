import usePlaylistContent from './usePlaylistContent';

const PlaylistContent = ({ accessToken, selectedPlaylist, hideContent }) => {
    const playlistContent = usePlaylistContent(accessToken, selectedPlaylist.tracks.href);
    return (
        <div className="overlay" >
            <div className="overlay-content" onClick={hideContent}>
                {playlistContent ? playlistContent.items.map((item) => {
                    return (
                        <div>
                            {item.track.name}
                        </div>
                    );
                }) : "Loading..."}
            </div>
        </div>
  );
};

export default PlaylistContent;
