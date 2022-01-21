import { useState, useEffect } from 'react';

import axios from 'axios'

const useUserProfile = (accessToken) => {
    const [userInfo, setUserInfo] = useState();

    /*
    / Acquires the current User's profile information
    */
    useEffect(() => {
        if(!accessToken) return;
        const retrieveUserInfo = async () => {
            const res = await axios.get('https://api.spotify.com/v1/me', {  
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${accessToken}`
                } 
            });
            const data = res.data;
            console.log('User Info');
            console.log(data);
            setUserInfo(data);
        }
        retrieveUserInfo();
    }, [accessToken]);

    return userInfo;
};

export default useUserProfile;
