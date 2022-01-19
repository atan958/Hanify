import '../../../css/home.css'
import useSpotifyGroups from './useSpotifyGroups'

const Home = ({ userId }) => {
    const spotifyGroups = useSpotifyGroups();
    console.log(userId);

    return (
        <div className="home-container vertical-center horizontal-center">
            {!spotifyGroups && <div class="lds-facebook"><div></div><div></div><div></div></div>}
        </div>
    )
}

export default Home
