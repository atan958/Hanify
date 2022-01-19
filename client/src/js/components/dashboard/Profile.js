import useUserInfo from "./useUserInfo"

const Profile = ({ accessToken }) => {
    const userInfo = useUserInfo(accessToken);

    return (
        <div>
            {userInfo?.display_name}
        </div>
    )
}

export default Profile
