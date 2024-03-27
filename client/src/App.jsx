import "./App.css";

import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "../src/components/Navbar";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "#E1D9D1",
            color: "#00C100",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
