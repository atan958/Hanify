import { useEffect, useState } from 'react'

import usePlaylistContent from './usePlaylistContent';

const PlaylistContent = ({ accessToken, selectedPlaylist, choosePlaylistTrack, playingTrack }) => {
    const playlistContent = usePlaylistContent(accessToken, selectedPlaylist?.tracks.href);
    console.log(playlistContent);
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
                        <PlaylistTrack item={item} choosePlaylistTrack={choosePlaylistTrack} playingTrack={playingTrack}/>
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

const PlaylistTrack = ({ item, choosePlaylistTrack, playingTrack }) => {
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        (item.track?.uri === playingTrack?.uri) ? setPlaying(true) : setPlaying(false);
    });

    return (
        <div className={`my-1 d-flex p-2 fade-in-anm playlist-item align-items-center ${playing && 'playlist-track-playing'}`} onClick={() => { choosePlaylistTrack(item.track) }}>
            <div><img src={item.track.album.images[0].url} style={{ width: '64px', height: '64px'}}/></div>
            <div className="fade-in-anm">
                <div className="mx-3">{item.track.name}</div>
                <div className="mx-3 text-muted">{item.track.artists[0].name}</div>
            </div>
        </div>
    );
}
