import { useState, useEffect } from 'react';

import axios from 'axios'

const usePlaylistContent = (accessToken, playlistTrackUrl) => {
    const [playlistContent, setPlaylistContent] = useState();
    
    useEffect(() => {
        if(!playlistTrackUrl) return;
        const retrievePlaylistContent = async () => {
            const res = await axios.get(playlistTrackUrl, {  
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${accessToken}`
                } 
            });
            const data = res.data;
            console.log('data');
            console.log(data);
            setPlaylistContent(data);
        }
        retrievePlaylistContent();
    }, [accessToken, playlistTrackUrl]);
  
    return playlistContent;
};

export default usePlaylistContent;
