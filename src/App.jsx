import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProfileUpdate from "./Components/ProfileUpdate";
import ChangePassword from "./Components/ChangePassword";
import Expenses from "./Components/Expenses";
import { useContext } from "react";
import AuthContext from "./Store/Auth-Context";

export default function App() {
  const ctx = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          ctx.isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/auth" />
        }
      />
      <Route path="/auth" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfileUpdate />} />
      <Route path="/changepwd" element={<ChangePassword />} />
      <Route path="/expenses" element={<Expenses />} />
    </Routes>
  );
}
