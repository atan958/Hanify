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

    console.log(userProfile);
    return (
        <div>
            {showPlaylistContent && <PlaylistContent hideContent={() => setShowPlaylistContent(false)} selectedPlaylist={selectedPlaylist} accessToken={accessToken} choosePlaylistTrack={choosePlaylistTrack}/>}
            {(!userProfile && !userPlaylists) && <PlaylistsLoading />}
            {userProfile?.display_name}
            {userPlaylists?.map((playlist) => {
                const playlistImg = <img src={playlist.images[0].url} width={64} height={64}/>
                return (
                    <div onClick={() => {
                        setSelectedPlaylist(playlist);
                        setShowPlaylistContent(true);
                        }}>
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