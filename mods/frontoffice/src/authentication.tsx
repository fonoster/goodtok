import * as SDK from "@goodtok/sdk";
import { getDefaultWorkspaceId } from "~utils/getDefaultWorkspaceId";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { API_ENDPOINT } from "~envs";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  client: SDK.Client | null;
  isSignedIn: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
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
  const [isSignedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isSignedIn") === "true"; // Initialize state from localStorage
  });

  const [client, setClient] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const client = new SDK.Client({
        endpoint: API_ENDPOINT,
        workspace: getDefaultWorkspaceId(accessToken)
      });
      client.setToken(accessToken);
      return client;
    }
    return null;
  });

  const signIn = async (username: string, password: string) => {
    const client = new SDK.Client({
      endpoint: API_ENDPOINT
    });

    await client.login(username, password);

    const defaultWorkspaceId = getDefaultWorkspaceId(client.getToken());
    client.setDefaultWorkspaceId(defaultWorkspaceId);

    setClient(client);
    setIsLoggedIn(true);

    localStorage.setItem("isSignedIn", "true");
    localStorage.setItem("accessToken", client.getToken());
  };

  const signOut = () => {
    localStorage.removeItem("isSignedIn");
    // FIXME: Set client to null causes a crash
    // setClient(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("isSignedIn") !== "true") {
      signOut();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ client, isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
