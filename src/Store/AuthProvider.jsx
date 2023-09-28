import React, { useState } from "react";
import AuthContext from "./Auth-Context";

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const initTokenValue = localStorage.getItem("token");
  const [token, setToken] = useState(initTokenValue);

  const loginHandler = (idtoken) => {
    setToken(idtoken);
    localStorage.setItem("token", token);
  };
  const authContext = {
    token: "",
    login: loginHandler,
    setSignUp: setIsSignedUp,
    isSignedUp: isSignedUp,
    isLoggedIn: isLoggedIn,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
