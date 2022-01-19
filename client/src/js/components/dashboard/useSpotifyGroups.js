import { useState, useEffect } from 'react';
import axios from 'axios'

const HanifyApiUrl = 'https://localhost:5001/spotifygroups';

const useSpotifyGroups = () => {
    const [spotifyGroups, setSpotifyGroups] = useState();

    useEffect(() => {
        const retrieveSpotifyGroups = async () => {
            const res = await axios.get(HanifyApiUrl);
            const data = res.data;
            console.log(data);
        }
        //retrieveSpotifyGroups();
    });
    return spotifyGroups;
};

export default useSpotifyGroups;


/*
const HanifyApiUrl = 'https://localhost:5001/spotifygroups';

app.get('/spotifygroups', async (req, res) => {
    console.log('Made it Here');
    const hanifyApiRes = await axios.get(HanifyApiUrl,{
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    });
    const spotifyGroups = hanifyApiRes.data;
    console.log('I got here');
    res.json({
        spotifyGroups
    })
});
*/