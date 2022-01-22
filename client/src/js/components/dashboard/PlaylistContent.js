import { useState, useEffect } from 'react';

import useIsTrackPlaying from './useIsTrackPlaying';
import usePlaylistContent from './usePlaylistContent';

const PlaylistContent = ({ accessToken, selectedPlaylist, choosePlaylistTrack, playingTrack, userInfo }) => {
    const playlistContent = usePlaylistContent(accessToken, selectedPlaylist?.tracks.href);
    const [loadingContent, setLoadingContent] = useState(false);
    
    /*
    / Display a loading state for the content when
    */
    useEffect(() => {
        if(!selectedPlaylist) return;
        setLoadingContent(true);
    }, [selectedPlaylist]);

    useEffect(() => {
        if(!selectedPlaylist) return;
        setLoadingContent(false);
    }, [playlistContent]);

    const getPlaylistDuration = (playlistContent) => {
        let duration_ms = 0;
        playlistContent.items.forEach((item) => {
            duration_ms += item.track.duration_ms;
        });

        const duration_s = Math.floor(duration_ms/1000);
        const total_h = Math.floor(duration_s/3600);
        const remainder_m = Math.floor((duration_s - total_h*3600)/60);

        return total_h ? `${total_h} hr ${remainder_m} min` : `${remainder_m} min`;
    }

    return (
        <>
        <div className="selected-playlist-header-container py-3 px-5 d-flex flex-row">
            <div className="playlist-content-avatar">
                <img src={selectedPlaylist?.images[0].url} className="playlist-content-avatar-img"/>
            </div>
            <div className="playlist-content-title-container px-5">
                <div className="playlist-content-title-spacer"/>
                <div className="playlist-content-title">
                    {selectedPlaylist?.name}
                </div>
                {selectedPlaylist &&
                <div className="playlist-content-info-container">
                    <img src={userInfo?.images[0].url} className="playlist-content-info-img"/>
                    <span className="playlist-owner">
                        {`${userInfo.display_name}`} 
                    </span>
                    <span className="playlist-content-info-dot mx-2"/>
                    <span>
                        {`${playlistContent?.total} Songs, ${playlistContent && getPlaylistDuration(playlistContent)}`}
                    </span>
                </div>
                }
            </div>
        </div>
        <div className="playlist-content-container-hide-scrollbar d-flex flex-column fade-in-anm">
            <div className="d-flex flex-column playlist-content-container playlist-content-bg">
                {loadingContent ?
                "Loading Content"
                :
                (playlistContent) ? 
                    playlistContent.items.map((item) => {
                        return (
                            <PlaylistTrack 
                                item={item} 
                                choosePlaylistTrack={choosePlaylistTrack} 
                                playingTrack={playingTrack} 
                            />
                        );
                    }) 
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
