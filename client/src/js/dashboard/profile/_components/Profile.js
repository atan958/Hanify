import { useState } from 'react';

import PlaylistContent from "./PlaylistContent";
import useUserProfile from "../_hooks/useUserProfile";
import useUserPlaylists from "../_hooks/useUserPlaylists";

import '../../../../css/profile.css'

const Profile = ({ accessToken, chooseTrack, playingTrack }) => {
    const userProfile = useUserProfile(accessToken);
    const userPlaylists = useUserPlaylists(accessToken);
    const [selectedPlaylist, setSelectedPlaylist] = useState();

    const displayPlaylistContent = (playlist) => {
        setSelectedPlaylist(playlist);
    }

    return (
        <div>
            {userProfile && 
                <ProfileAvatar userProfile={userProfile}/>
            }
            <PlaylistContent 
                selectedPlaylist={selectedPlaylist} 
                accessToken={accessToken} 
                chooseTrack={chooseTrack}
                playingTrack={playingTrack}
                userInfo={userProfile}
            />
            {(!userProfile && !userPlaylists) && <PlaylistsLoading />}
            {userPlaylists && 
                <PlaylistDisplaysContainer 
                    userPlaylists={userPlaylists}
                    displayPlaylistContent={displayPlaylistContent}
                />
            }
        </div>
    )
}

export default Profile

const PlaylistsLoading = () => {
    return (
    <div className="loading-groups-container vertical-center horizontal-center">
        <div class="lds-facebook">
            <div/><div/><div/>
        </div>
    </div>
    );
}

const ProfileAvatar = ({ userProfile }) => {
    const [showProfileAvatar, setShowProfileAvatar] = useState(true);

    const fadeOutProfileAvatar = () => {
        setShowProfileAvatar(false);
        setTimeout(() => {
            setShowProfileAvatar(true);
        }, 2000);
    }

    return (
    <div className={`profile-avatar-container align-items-center${!showProfileAvatar && 'hide-avatar-again'}`} style={{ visibility: !showProfileAvatar && 'hidden', opacity: !showProfileAvatar && '0' }} onMouseOver={fadeOutProfileAvatar}>
        <div className="profile-avatar">
                <img 
                    className="profile-avatar-img" 
                    src={userProfile.images[0] ? 
                        userProfile.images[0].url 
                        : 
                        "https://www.computerhope.com/jargon/g/guest-user.jpg"
                    }
                    alt="Skytsunami"
                />
        </div>
        <div className="profile-avatar-name ">
            {userProfile?.display_name}
        </div>
    </div>
    );
}

const PlaylistDisplaysContainer = ({ userPlaylists, displayPlaylistContent }) => {
    const [showContainer, setShowContainer] = useState(false);

    const playlistDisplays = userPlaylists.map((playlist) => {
        return (
            <PlaylistDisplay 
                playlist={playlist} 
                displayPlaylistContent={displayPlaylistContent}
            />
        );
    })

    return (
        <>
            <div 
                className="hide-playlist-displays-btn fade-in-anm" 
                onClick={() => setShowContainer(!showContainer)} 
                style={{ bottom: !showContainer && '-256px', backgroundColor: showContainer ? 'red' : 'green' }}
            >
                {showContainer ? 'Hide Playlists' : 'Show Playlists'}
            </div>
            <div className="playlist-displays-container flex-row d-inline-flex" style={{ bottom: !showContainer && '-256px' }}>
                {playlistDisplays}
            </div>
        </>
    );
}

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