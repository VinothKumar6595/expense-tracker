import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProfileUpdate from "./Components/ProfileUpdate";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfileUpdate />} />
    </Routes>
  );
}
