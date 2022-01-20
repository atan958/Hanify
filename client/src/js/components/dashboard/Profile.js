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

    console.log(userProfile);
    return (
        <div>
            {userProfile && <ProfileAvatar userProfile={userProfile}/>}
            {showPlaylistContent && <PlaylistContent hideContent={() => setShowPlaylistContent(false)} selectedPlaylist={selectedPlaylist} accessToken={accessToken} choosePlaylistTrack={choosePlaylistTrack}/>}
            {(!userProfile && !userPlaylists) && <PlaylistsLoading />}
            {userPlaylists?.map((playlist) => {
                const playlistImg = <img src={playlist.images[0].url} width={64} height={64}/>
                return (
                    <div className="fade-in-anm playlist-display bg-info my-1" 
                        onClick={() => displayPlaylistContent(playlist)}>
                        {playlistImg}{playlist.name}
                    </div>
                );
            })}
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