import { createContext, useContext, useState, useEffect } from 'react';
import Client from "@goodtok/sdk/src/client";

const AuthContext = createContext();

const DEFAULT_ENDPOINT = "http://localhost:5000/v1";
const DEFAULT_WORKSPACE_ID = "default";

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [client, setClient] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const client = new Client({
        endpoint: DEFAULT_ENDPOINT,
        workspaceId: DEFAULT_WORKSPACE_ID
      });
      client.setToken(accessToken);
      return client;
    }
    return null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'; // Initialize state from localStorage
  });

  const login = async (username: string, password: string) => {
    const clientInstance = new Client({
      endpoint: DEFAULT_ENDPOINT,
      workspaceId: DEFAULT_WORKSPACE_ID
    });
    await clientInstance.login(username, password);
    setClient(clientInstance);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('accessToken', clientInstance.getToken());
  };

  const logout = () => {
    setClient(null);
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login state
  };

  useEffect(() => {
    // Handle cases where the login state might be invalidated, e.g., token expiration
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ client, isLoggedIn, login, logout }} >
        {children}
    </AuthContext.Provider>
  );
}
