import SpotifyGroupDisplay from './SpotifyGroupDisplay';

const SpotifyGroupDisplaysContainer = ({ groups }) => {
    /*
    /
    */
    const renderSpotifyGroupDisplays = () => { 
        const groupDisplays = groups.map(group => {
            return (
                <SpotifyGroupDisplay group={group}/>
            );
        });
        
        return groupDisplays;
    }
    
    return (
            <div className="group-display-container-container fade-in-anm">
                {renderSpotifyGroupDisplays()}
            </div>
    );
}

export default SpotifyGroupDisplaysContainer;