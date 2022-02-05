import { useState, useEffect } from 'react';

import PlaylistTrack from './PlaylistTrack';
import PrePlaylistSelectionLoading from './PrePlaylistSelectionLoading'
import usePlaylistContent from '../_hooks/usePlaylistContent';

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
                        <PrePlaylistSelectionLoading/>
                    </div>
                }
            </div>
        </div>
        </>
  );
};

export default PlaylistContent;

const LoaderLoadingContent = () => {
    return(
        <div className="content-loader-centered">
            <div class="lds-circle"><div></div></div>
        </div>
    );
}