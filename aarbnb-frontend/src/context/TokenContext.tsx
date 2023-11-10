import React, { createContext, useCallback, useContext, useState } from 'react';

interface TokenContextProps {
  token: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
}

const TokenContext = createContext<TokenContextProps>({
  token: null,
  saveToken: () => null,
  removeToken: () => null,
});

export const useTokenContext = () => useContext(TokenContext)

export const TokenContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
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


  return (
    <TokenContext.Provider value={{token, saveToken, removeToken}}>
      {children}
    </TokenContext.Provider>
  );
};
