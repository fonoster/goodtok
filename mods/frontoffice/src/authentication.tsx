import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";

import * as SDK from "@goodtok/sdk";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const DEFAULT_WORKSPACE_ID = import.meta.env.VITE_DEFAULT_WORKSPACE_ID;

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  client: any;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [client, setClient] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const client = new SDK.Client({
        endpoint: API_ENDPOINT,
        workspaceId: DEFAULT_WORKSPACE_ID
      });
      client.setToken(accessToken);
      return client;
    }
    return null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true"; // Initialize state from localStorage
  });

  const login = async (username: string, password: string) => {
    const clientInstance = new SDK.Client({
      endpoint: API_ENDPOINT,
      workspaceId: DEFAULT_WORKSPACE_ID
    });
    await clientInstance.login(username, password);
    setClient(clientInstance);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("accessToken", clientInstance.getToken());
  };

  const logout = () => {
    setClient(null);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Clear login state
  };

  useEffect(() => {
    // Handle cases where the login state might be invalidated, e.g., token expiration
    if (localStorage.getItem("isLoggedIn") !== "true") {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ client, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
