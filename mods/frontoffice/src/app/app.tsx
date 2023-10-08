import Dashboard from 'components/organisms/dashboard';
import LoginScreen from 'components/organisms/login';
import { useAuth } from '../authentication';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard /> : <LoginScreen />}
    </div>
  );
}

export default App;
