import React, { createContext, useContext } from "react";
import { HttpClient } from "../services/httpClient";
import {
  RequestService,
  RestApplicationClient,
  TokenService,
  UserService,
} from "../services/restApplicationClient";

const unauthenticatedRestApplicationClient = new RestApplicationClient(
  new HttpClient(),
  undefined
);

interface ServicesContextProps {
  requestService: RequestService;
  tokenService: TokenService;
  userService: UserService;
}

const ServicesContext = createContext<ServicesContextProps>({
  requestService: unauthenticatedRestApplicationClient,
  tokenService: unauthenticatedRestApplicationClient,
  userService: unauthenticatedRestApplicationClient,
});

export const useServicesContext = () => useContext(ServicesContext);

export const ServicesContextProvider: React.FC<{
  token: string | null;
  children: React.ReactNode;
}> = ({ token, children }) => {
  const restApplicationClient = new RestApplicationClient(
    new HttpClient(),
    token ?? undefined
  );

  return (
    <ServicesContext.Provider
      value={{
        requestService: restApplicationClient,
        tokenService: restApplicationClient,
        userService: restApplicationClient,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
