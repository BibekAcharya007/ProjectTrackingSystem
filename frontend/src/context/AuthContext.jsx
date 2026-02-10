import { createContext, useContext, useEffect, useState } from "react";
import { getRole, getToken, removeRole, removeToken, setRole, setToken } from "../utils/tokenHelper";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(getToken());
  const [role, setRoleState] = useState(getRole());

  const login = (tokenValue, roleValue) => {
    setToken(tokenValue);
    setRole(roleValue);
    setTokenState(tokenValue);
    setRoleState(roleValue);
  };

  const logout = () => {
    removeToken();
    removeRole();
    setTokenState(null);
    setRoleState(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
