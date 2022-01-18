import { useState, useEffect, useRef, useMemo } from 'react'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    

    /*
    / Logs user in via Spotify and creates intial Access Token
    */
    useEffect(() => {
        
        axios
            .post('http://localhost:3001/login', {
                code, 
            })
            .then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn({ value: res.data.expiresIn }); console.log(res.data);
                /*
                / Removes the client id string from the logged-in URL
                */
                window.history.pushState({}, null, '/')
            })
            .catch(() => {
                window.location = '/'
            })
    },[code]);

    /*
    / Automatically refreshes Access Token every 59 minutes 
    */
    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const timeOut = setTimeout(()=> {
            axios
            .post('http://localhost:3001/refresh', {
                refreshToken, 
            })
            .then(res => {
                setAccessToken(res.data.accesToken);
                setExpiresIn({ value: res.data.expiresIn });

                /*
                / Removes the client id from the logged-in URL
                */
                window.history.pushState({}, null, '/')
            })
            .catch(() => {
                window.location = '/'
            })
        }, (expiresIn.value - 60) * 1000);

        return (() => {
            clearTimeout(timeOut);
        });
    }, [refreshToken, expiresIn]);



    /*
    / Note: Access Token only lasts an hour
    */
    return accessToken;
}

