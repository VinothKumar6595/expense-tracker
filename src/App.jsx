import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProfileUpdate from "./Components/ProfileUpdate";
import ChangePassword from "./Components/ChangePassword";
import Expenses from "./Components/Expenses";
import { useContext, useEffect, useState } from "react";
// import AuthContext from "./Store/Auth-Context";
import { useSelector } from "react-redux";

export default function App() {
  // const ctx = useContext(AuthContext);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isLoggedIn, setISLoggedIn] = useState(false);

  useEffect(() => {
    const initialState = localStorage.getItem("isLoggedIn");
    initialState && setISLoggedIn(true);
  });

  console.log(isLoggedIn);
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/auth" />}
      />
      <Route path="/auth" element={<Login />} />
      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/auth" />}
      />
      <Route
        path="/profile"
        element={isLoggedIn ? <ProfileUpdate /> : <Navigate to="/auth" />}
      />
      <Route path="/changepwd" element={!isLoggedIn && <ChangePassword />} />
      <Route
        path="/expenses"
        element={isLoggedIn ? <Expenses /> : <Navigate to="/auth" />}
      />
    </Routes>
  );
}
