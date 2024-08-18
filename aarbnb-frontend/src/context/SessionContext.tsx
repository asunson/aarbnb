import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { RestApplicationClient } from "../services/restApplicationClient";
import { HttpClient } from "../services/httpClient";

interface SessionContextProps {
  token: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const SessionContext = createContext<SessionContextProps>({
  token: null,
  saveToken: () => null,
  removeToken: () => null,
  user: null,
  setUser: () => null,
});

export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const getToken = (): string | null => {
    const userToken = localStorage.getItem("token");
    return userToken && userToken;
  };

  const getUserFromToken = useCallback(async (): Promise<User | null> => {
    const userToken = localStorage.getItem("token");
    const email = getEmailFromToken(userToken)
    if (email == null) return null

    const restApplicationClient = new RestApplicationClient(
      new HttpClient(),
      userToken ?? undefined
    );

    try {
      return await restApplicationClient.getUserByEmail(email)
    } catch (e) {
      console.error(e)
      return null
    }
  }, [])

  const saveToken = useCallback((userToken: string): void => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  }, []);

  const removeToken = useCallback((): void => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  useEffect(() => {
    getUserFromToken().then(user => setUser(user))
  }, [getUserFromToken])

  const [token, setToken] = useState<string | null>(getToken());
  const [user, setUser] = useState<User | null>(null);
  console.log(token)

  return (
    <SessionContext.Provider
      value={{ token, saveToken, removeToken, user, setUser }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const getEmailFromToken = (token: string | null) => {
  if (token == null) return null
  const claims = JSON.parse(atob(token.split('.')[1]))

  return claims.sub
}