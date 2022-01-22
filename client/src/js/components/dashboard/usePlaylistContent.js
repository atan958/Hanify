import { useState, useEffect } from 'react';

import axios from 'axios'

const usePlaylistContent = (accessToken, playlistTrackUrl) => {
    const [playlistContent, setPlaylistContent] = useState();
    
    useEffect(() => {
        if(!playlistTrackUrl) return;
        let cancel = false;
        const retrievePlaylistContent = async () => {
            const res = await axios.get(playlistTrackUrl, {  
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${accessToken}`
                } 
            });
            if(cancel) return;
            const data = res.data;
            setPlaylistContent(data);
        }
        retrievePlaylistContent();
        return(() => {
            cancel = true;
        });
    }, [accessToken, playlistTrackUrl]);
  
    return playlistContent;
};

export default usePlaylistContent;
