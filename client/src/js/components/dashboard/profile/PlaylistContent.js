import { useState, useEffect } from 'react';

import useIsTrackPlaying from '../_hooks/useIsTrackPlaying';
import usePlaylistContent from './usePlaylistContent';

import '../../../../css/animations/playlist-content-loading.css'
import '../../../../css/animations/pre-playlist-select.css'

const PlaylistContent = ({ accessToken, selectedPlaylist, chooseTrack, playingTrack, userInfo }) => {
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
            {selectedPlaylist ? 
            <>
            <div className="playlist-content-avatar">
                <img src={selectedPlaylist?.images[0].url} className="playlist-content-avatar-img"/>
            </div>
            <div className="playlist-content-title-container px-5">
                <div className="playlist-content-title-spacer"/>
                <div className="playlist-content-title">
                    {selectedPlaylist?.name}
                </div>
                <div className="playlist-content-info-container">
                    {loadingContent ?
                    <div>
                        ...
                    </div>
                    :
                    selectedPlaylist && 
                    <>
                        <img src={userInfo?.images[0].url} className="playlist-content-info-img"/>
                        <span className="playlist-owner fade-in-anm">
                            {`${userInfo.display_name}`} 
                        </span>
                        <span className="playlist-content-info-dot mx-2 fade-in-anm"/>
                        <span className="fade-in-anm">
                            {`${playlistContent?.total} Songs, ${playlistContent && getPlaylistDuration(playlistContent)}`}
                        </span>
                    </>
                    }
                </div>
            </div>
            </>
            :
            (userInfo &&
            <div className="pre-playlist-selection-title fade-in-anm">
                <span className="profile-header-first-name">
                    {userInfo?.display_name.split(" ")[0]}
                </span>
                    {`\'s Tracks`}
            </div>)
            }
        </div>
        <div className="playlist-content-container-hide-scrollbar d-flex flex-column fade-in-anm">
            <div className="d-flex flex-column playlist-content-container playlist-content-bg">
                {loadingContent ?
                <LoaderLoadingContent/>
                :
                (playlistContent) ? 
                    playlistContent.items.map((item) => {
                        return (
                            <PlaylistTrack 
                                item={item} 
                                chooseTrack={chooseTrack} 
                                playingTrack={playingTrack} 
                            />
                        );
                    }) 
                    : 
                    <div className="playlist-content-placeholder">
                        <PrePlaylistSelectionLoader/>
                    </div>
                }
            </div>
        </div>
        </>
  );
};

export default PlaylistContent;

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

const PrePlaylistSelectionLoader = () => {
    return (
    <div className="pre-playlist-selection-container">
        <div className="background-wrap">
            <div className="x1 fade-in-anm">
                <div className="cloud"></div>
            </div>

            <div className="x2 fade-in-anm">
                <div className="cloud"></div>
            </div>

            <div className="x3 fade-in-anm">
                <div className="cloud"></div>
            </div>

            <div className="x4 fade-in-anm">
                <div className="cloud"></div>
            </div>

            <div className="x5 fade-in-anm">
                <div className="cloud"></div>
            </div>
        </div>
    </div>
    );
}

const LoaderLoadingContent = () => {
    return(
        <div className="content-loader-centered">
            <div class="lds-circle"><div></div></div>
        </div>
    );
}