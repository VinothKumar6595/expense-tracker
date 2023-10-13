// import React, { useState } from "react";
// import AuthContext from "./Auth-Context";
// import { useNavigate } from "react-router-dom";

// const AuthProvider = (props) => {
//   const navigate = useNavigate();
//   const initLoggedInValue = localStorage.getItem("isLoggedIn");
//   const [isLoggedIn, setIsLoggedIn] = useState(initLoggedInValue);
//   const [isSignedUp, setIsSignedUp] = useState(false);
//   const initTokenValue = localStorage.getItem("token");
//   const [token, setToken] = useState(initTokenValue);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const initEndPoint = localStorage.getItem("endpoint");
//   const [endpoint, setEndPoint] = useState(initEndPoint);
//   const [profileUpdated, setProfileUpdated] = useState(false);
//   const [editExpense, setEditExpense] = useState(false);

//   const loginHandler = (idtoken, endpoint) => {
//     setToken(idtoken);
//     localStorage.setItem("token", idtoken);
//     setIsLoggedIn(true);
//     localStorage.setItem("isLoggedIn", true);
//     setEndPoint(endpoint);
//     localStorage.setItem("endpoint", endpoint);
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("endpoint");
//     localStorage.clear();
//     setToken(null);
//     setEndPoint("");
//     setIsLoggedIn(false);
//     navigate("/auth");
//   };

//   const authContext = {
//     isEmailVerified: isEmailVerified,
//     isProfileUpdated: profileUpdated,
//     endpoint: endpoint,
//     editExpense: editExpense,
//     setEditExpense: setEditExpense,
//     setEmailVerification: setIsEmailVerified,
//     setProfileUpdated: setProfileUpdated,
//     token: token,
//     logout: logoutHandler,
//     login: loginHandler,
//     setSignUp: setIsSignedUp,
//     isSignedUp: isSignedUp,
//     isLoggedIn: isLoggedIn,
//   };
//   return (
//     <AuthContext.Provider value={authContext}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
