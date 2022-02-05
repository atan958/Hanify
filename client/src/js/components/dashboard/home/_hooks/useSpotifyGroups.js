import { useState, useEffect } from 'react';
import axios from 'axios'

const HanifyApiUrl = 'https://localhost:5001/spotifygroups';

const useSpotifyGroups = () => {
    const [spotifyGroups, setSpotifyGroups] = useState();

    useEffect(() => {
        const retrieveSpotifyGroups = async () => {
            const res = await axios.get(HanifyApiUrl);
            const data = res.data;
            setSpotifyGroups(data);
        }
        retrieveSpotifyGroups();
    }, []);
    return spotifyGroups;
};

export default useSpotifyGroups;
