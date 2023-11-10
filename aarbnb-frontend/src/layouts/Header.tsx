import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { useServicesContext } from "../context/ServicesContext";
import { useSessionContext } from "../context/SessionContext";

export const Header: React.FC = () => {
  const { tokenService } = useServicesContext();
  const { removeToken, setUser } = useSessionContext();

  const logout = useCallback(() => {
    tokenService
      .removeToken()
      .then((_) => {
        removeToken();
        setUser(null);
      })
      .catch((e) => console.error(e));
  }, [tokenService, setUser, removeToken]);

  return (
    <div className="App-header">
      <div>Aarbnb</div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
