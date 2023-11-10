import React, { createContext, useCallback, useContext, useState } from "react";
import { User } from "../types";

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

  const saveToken = useCallback((userToken: string): void => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  }, []);

  const removeToken = useCallback((): void => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  const [token, setToken] = useState<string | null>(getToken());
  const [user, setUser] = useState<User | null>(null);

  return (
    <SessionContext.Provider
      value={{ token, saveToken, removeToken, user, setUser }}
    >
      {children}
    </SessionContext.Provider>
  );
};
