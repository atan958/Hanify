import { Container } from 'react-bootstrap'

/*
/ When re-directed to this URL => The user will be asked for the specified authentication => Gives the user a login code once logged in => re-directs back to https://localhost:300 once logged in via Spotify
*/
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=f4ac31f857c64234a172c74f9bd21cb8&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
    return (
    <Container 
        className="d-flex justify-center align-items-center bg-info"
        style={{ minHeight: "100vh" }}
    >
        <a className="btn btn-success btn-lg" href={AUTH_URL}>Login with Spotify</a>
    </Container>
    );
}
