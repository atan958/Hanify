import '../../../css/home.css'
import useSpotifyGroups from './useSpotifyGroups'

const Home = ({ userId }) => {
    const spotifyGroups = useSpotifyGroups();
    console.log('Inside Home');
    console.log(spotifyGroups);

    return (
        <div className="home-container vertical-center horizontal-center">
            {spotifyGroups && spotifyGroups.map(group => <div>{group.name}</div>)}
            {!spotifyGroups && <div class="lds-facebook"><div></div><div></div><div></div></div>}
        </div>
    )
}

export default Home
