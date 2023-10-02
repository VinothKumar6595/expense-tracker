import React from "react";

const AuthContext = React.createContext({
  token: null,
  setProfileUpdated: () => {},
  setEmailVerification: () => {},
  setEditExpense: () => {},
  endpoint: "",
  editExpense: false,
  isProfileUpdated: false,
  isEmailVerified: false,
  login: (token) => {},
  logout: () => {},
  setSignUp: () => {},
  isSignedUp: false,
  isLoggedIn: false,
});

export default AuthContext;
