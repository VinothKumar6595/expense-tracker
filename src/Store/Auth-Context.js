import React from "react";

const AuthContext = React.createContext({
  token: null,
  setSignUp: () => {},
  isSignedUp: false,
  isLoggedIn: false,
});

export default AuthContext;
