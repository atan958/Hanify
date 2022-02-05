import SpotifyGroupsLoading from './SpotifyGroupsLoading';
import SpotifyGroupDisplaysContainer from './SpotifyGroupDisplaysContainer';

import useSpotifyGroups from '../_hooks/useSpotifyGroups'

import '../../../../css/home.css'

const Home = () => {
    const spotifyGroups = useSpotifyGroups();

    return (
        <div className="home-container">
            {spotifyGroups ? 
                <SpotifyGroupDisplaysContainer groups={spotifyGroups}/>
                :
                <SpotifyGroupsLoading />
            }
        </div>
    )
}

export default Home
