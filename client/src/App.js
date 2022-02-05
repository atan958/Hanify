import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './js/login/Login'
import Dashboard from './js/components/dashboard/_components/Dashboard'

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    code ? <Dashboard code={code}/> : <Login />
  );
}

export default App;
