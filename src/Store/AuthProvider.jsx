import React, { useState } from "react";
import AuthContext from "./Auth-Context";
import { useNavigate } from "react-router-dom";

const AuthProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const initTokenValue = localStorage.getItem("token");
  const [token, setToken] = useState(initTokenValue);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const loginHandler = (idtoken) => {
    setToken(idtoken);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const authContext = {
    isEmailVerified: isEmailVerified,
    setEmailVerification: setIsEmailVerified,
    token: token,
    logout: logoutHandler,
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
