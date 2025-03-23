import "./App.css";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./signin/SignIn";
import Signup from "./signup/Signup";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          {/* Add more routes as needed */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<SignIn />} />
          {/* Redirect root to signin */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>Page Not Found</div>} />

          {/* 404 route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
