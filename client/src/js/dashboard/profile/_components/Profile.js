import { useState } from 'react';

import PlaylistContent from "./PlaylistContent";
import ProfileAvatar from './ProfileAvatar';
import PlaylistDisplaysContainer from './PlaylistDisplaysContainer';

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
            {userPlaylists && 
                <PlaylistDisplaysContainer 
                    userPlaylists={userPlaylists}
                    displayPlaylistContent={displayPlaylistContent}
                />
            }
        </div>
    )
}

export default Profile;
