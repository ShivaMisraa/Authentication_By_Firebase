import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let logoutTimer;

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    const expirationTime = new Date().getTime() + 5 * 60 * 1000; // Set expiration time 5 minutes in the future
    localStorage.setItem('expirationTime', expirationTime);
    startLogoutTimer(expirationTime);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    clearTimeout(logoutTimer);
  };

  const startLogoutTimer = (expirationTime) => {
    const remainingTime = expirationTime - new Date().getTime();
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (storedToken && expirationTime && currentTime < expirationTime) {
      startLogoutTimer(expirationTime);
    } else {
      logoutHandler();
    }
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
