import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
