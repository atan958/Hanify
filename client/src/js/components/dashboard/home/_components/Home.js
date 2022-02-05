import '../../../../../css/home.css'
import useSpotifyGroups from '../_hooks/useSpotifyGroups'

const Home = () => {
    const spotifyGroups = useSpotifyGroups();

    return (
        <div className="home-container">
            {spotifyGroups && <SpotifyGroupDisplays groups={spotifyGroups}/>}
            {!spotifyGroups && <SpotifyGroupsLoading />}
        </div>
    )
}

const SpotifyGroupsLoading = () => {
    return (
    <div className="loading-groups-container vertical-center horizontal-center">
        <div class="lds-facebook">
            <div/><div/><div/>
        </div>
    </div>
    );
}

const SpotifyGroupDisplays = ({ groups }) => {
    const groupDisplays = groups.map(group => {
        const avatarImg = getGroupAvatar(group);

        return (
        <div className="group-display-container mx-3 my-4 p-3">
            <div className="group-avatar mb-1 p-2">
                {avatarImg}
            </div>
            <div className="group-name">
                {group.name}
            </div>
        </div>
        );
    });
    return (
            <div className="group-display-container-container fade-in-anm">
                {groupDisplays}
            </div>
    );
}

const getGroupAvatar = (group) => {
    let avatarImg;
    try {
        avatarImg = <img className="group-avatar-img" src={require(`../../../assets/group-avatars/${group.avatar}.png`)} />
    }
    catch(e) {
        avatarImg = null;
    }
    return avatarImg;
}

export default Home
