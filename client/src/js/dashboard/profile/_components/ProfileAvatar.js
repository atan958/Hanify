import { useState } from 'react'

const ProfileAvatar = ({ userProfile }) => {
    const [showProfileAvatar, setShowProfileAvatar] = useState(true);

    const fadeOutProfileAvatar = () => {
        setShowProfileAvatar(false);
        setTimeout(() => {
            setShowProfileAvatar(true);
        }, 2000);
    }

    return (
    <div className={`profile-avatar-container align-items-center${!showProfileAvatar && 'hide-avatar-again'}`} style={{ visibility: !showProfileAvatar && 'hidden', opacity: !showProfileAvatar && '0' }} onMouseOver={fadeOutProfileAvatar}>
        <div className="profile-avatar">
                <img 
                    className="profile-avatar-img" 
                    src={userProfile.images[0] ? 
                        userProfile.images[0].url 
                        : 
                        "https://www.computerhope.com/jargon/g/guest-user.jpg"
                    }
                    alt="Skytsunami"
                />
        </div>
        <div className="profile-avatar-name ">
            {userProfile?.display_name}
        </div>
    </div>
    );
}

export default ProfileAvatar;