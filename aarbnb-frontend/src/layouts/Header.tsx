import React, { useCallback } from "react";
import { useServicesContext } from "../context/ServicesContext";
import { useSessionContext } from "../context/SessionContext";
import { Button } from "@components/button";

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
    <div className="flex min-h-16 justify-between text-xl px-4 items-center bg-primary text-white">
      <div>Aarbnb</div>
      <Button className="bg-slate-600 text-primary-foreground" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
