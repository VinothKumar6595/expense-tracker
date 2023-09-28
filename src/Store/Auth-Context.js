import React from "react";

const AuthContext = React.createContext({
  token: null,
  isEmailVerified: false,
  login: (token) => {},
  logout: () => {},
  setSignUp: () => {},
  isSignedUp: false,
  isLoggedIn: false,
});

export default AuthContext;
