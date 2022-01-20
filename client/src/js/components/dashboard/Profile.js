import { useState } from 'react'
import useUserProfile from "./useUserProfile"
import useUserPlaylists from "./useUserPlaylists";

import '../../../css/profile.css'

const Profile = ({ accessToken }) => {
    const userProfile = useUserProfile(accessToken);
    const userPlaylists = useUserPlaylists(accessToken);
    const [showPlaylistContent, setShowPlaylistContent] = useState(false)

    console.log(userProfile);
    return (
        <div>
            {showPlaylistContent &&             
            <div className="overlay" >
                <div className="overlay-content" onClick={() => setShowPlaylistContent(false)}>
                </div>
            </div>}
            {userProfile?.display_name}
            {userPlaylists?.map((playlist) => {
                const playlistImg = <img src={playlist.images[0].url} width={64} height={64}/>
                return <div onClick={() => setShowPlaylistContent(true)}>{playlistImg}{playlist.name}</div>
            })}
        </div>
    )
}

export default Profile
