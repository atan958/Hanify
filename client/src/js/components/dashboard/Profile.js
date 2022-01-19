import useUserProfile from "./useUserProfile"

const Profile = ({ accessToken }) => {
    const userProfile = useUserProfile(accessToken);
    console.log(userProfile);
    return (
        <div>
            {userProfile?.display_name}
        </div>
    )
}

export default Profile
