import { useState, useEffect } from 'react';

import axios from 'axios'

const useUserPlaylists = (accessToken) => {
    const [userPlaylists, setUserPlaylists] = useState([]);

    useEffect(() => {
        if(!accessToken) return;
        const retrieveUserPlayLists = async () => {
            const res = await axios.get('	https://api.spotify.com/v1/me/playlists', { 
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${accessToken}`
                } 
            });
            const data = res.data;
            // console.log(data.items);
            setUserPlaylists(data.items);
        }
        retrieveUserPlayLists();
    }, [accessToken]);

  return userPlaylists;
};

export default useUserPlaylists;
