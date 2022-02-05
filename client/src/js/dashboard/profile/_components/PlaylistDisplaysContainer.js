import { useState } from 'react'

import PlaylistDisplay from './PlaylistDisplay';

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

export default PlaylistDisplaysContainer;