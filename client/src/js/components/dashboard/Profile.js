import { useState } from 'react';
import useUserProfile from "./useUserProfile";
import useUserPlaylists from "./useUserPlaylists";
import PlaylistContent from "./PlaylistContent";

import '../../../css/profile.css'

const Profile = ({ accessToken, choosePlaylistTrack }) => {
    const userProfile = useUserProfile(accessToken);
    const userPlaylists = useUserPlaylists(accessToken);
    const [selectedPlaylist, setSelectedPlaylist] = useState();
    const [showPlaylistContent, setShowPlaylistContent] = useState(false);

    const displayPlaylistContent = (playlist) => {
        setSelectedPlaylist(playlist);
        setShowPlaylistContent(true);
    }

    const renderPlaylistDisplays = () => {
        return userPlaylists.map((playlist) => {
            return (
                <PlaylistDisplay 
                    playlist={playlist} 
                    displayPlaylistContent={displayPlaylistContent}
                />
            );
        })
    }

    console.log(userProfile);
    return (
        <div>
            {userProfile && <ProfileAvatar userProfile={userProfile}/>}
            {showPlaylistContent && <PlaylistContent hideContent={() => setShowPlaylistContent(false)} selectedPlaylist={selectedPlaylist} accessToken={accessToken} choosePlaylistTrack={choosePlaylistTrack}/>}
            {(!userProfile && !userPlaylists) && <PlaylistsLoading />}
            {userPlaylists && 
                <div className="playlist-displays-container flex-row d-inline-flex">
                    {renderPlaylistDisplays()}
                </div>
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
    <div className={`profile-avatar-container align-items-center ${!showProfileAvatar && 'hide-avatar'}`} onMouseOver={fadeOutProfileAvatar}>
        <div className="profile-avatar">
                <img className="profile-avatar-img" src="https://www.computerhope.com/jargon/g/guest-user.jpg" alt="Skytsunami" />
        </div>
        <div className="profile-avatar-name ">
            {userProfile?.display_name}
        </div>
    </div>
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