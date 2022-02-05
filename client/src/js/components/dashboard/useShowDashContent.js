import { useState } from 'react';

const useShowDashContent = (setSearch) => {
    const [showProfile, setShowProfile] = useState(false);
    const [showHome, setShowHome] = useState(true);
    const [showLyrics, setShowLyrics] = useState(false);

    const displayLyrics = () => {
        setShowLyrics(true);
        setShowHome(false);
        setShowProfile(false);
        setSearch("");
    }

    const displayHome = () => {
        setShowLyrics(false);
        setShowHome(true);
        setShowProfile(false);
        setSearch("");
    }

    const displayProfile = () => {
        setShowLyrics(false);
        setShowHome(false);
        setShowProfile(true);
        setSearch("");
    }

  return [showProfile, showHome, showLyrics, displayProfile, displayHome, displayLyrics];
};

export default useShowDashContent;
