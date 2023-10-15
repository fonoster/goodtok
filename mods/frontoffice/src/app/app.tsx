import Dashboard from "components/organisms/dashboard";
import LoginScreen from "components/organisms/login";
import { useAuth } from "../authentication";

function App() {
  const { isLoggedIn } = useAuth() as any;

  return (
    <div className="App h-full">
      {isLoggedIn ? <Dashboard /> : <LoginScreen />}
    </div>
  );
}

export default App;
