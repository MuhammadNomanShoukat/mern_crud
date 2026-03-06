import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const storeTokenInLs = (token) => {
    window.localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  let loggedIn = !!token;

  return (
    <ContextApi.Provider value={{ loggedIn, storeTokenInLs, logout }}>
      {children}
    </ContextApi.Provider>
  );
};

export const useAuth = () => {
  return useContext(ContextApi);
};
