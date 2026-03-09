import { createContext, useContext, useEffect, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [services, setServices] = useState([]);

  const storeTokenInLs = (token) => {
    setToken(token);
    window.localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken("");
    setLoggedInUser(null);
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    getServices()
    if(token){
      getAuthorizedUser();
    }
  }, []);

  const getServices = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(
        "http://localhost:5000/api/data/services",
        requestOptions,
      );

      if (response.ok) {
        const data = await response.json();
        
        // console.log("services user data",data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAuthorizedUser = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `${token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(
        "http://localhost:5000/api/auth/user",
        requestOptions,
      );

      if (response.ok) {
        const data = await response.json();
        setLoggedInUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let loggedIn = !!token;

  return (
    <ContextApi.Provider
      value={{
        loggedIn,
        storeTokenInLs,
        logout,
        getAuthorizedUser,
        loggedInUser,
        services,
        token
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useAuth = () => {
  return useContext(ContextApi);
};
