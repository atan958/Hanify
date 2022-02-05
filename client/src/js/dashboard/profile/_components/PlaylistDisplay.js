const PlaylistDisplay = ({ playlist, displayPlaylistContent }) => {
    const playlistImg = <img src={playlist.images[0].url} width={128} height={128}/>

    return(
    <div className="fade-in-anm playlist-display-container m-3 p-3" 
        onClick={() => displayPlaylistContent(playlist)}>
        <div>
            {playlistImg}
        </div>
        <div className="playlist-display-name">
            {playlist.name}
        </div>
    </div>
    );
}

export default PlaylistDisplay;