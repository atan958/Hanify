const SpotifyGroupDisplay = ({ group }) => {
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
}

const getGroupAvatar = (group) => {
    let avatarImg;
    try {
        avatarImg = <img className="group-avatar-img" src={require(`../../../../assets/group-avatars/${group.avatar}.png`)} />
    }
    catch(e) {
        avatarImg = null;
    }
    return avatarImg;
}

export default SpotifyGroupDisplay;