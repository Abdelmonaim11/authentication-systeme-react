import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./signin/SignIn";
import Signup from "./signup/Signup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        {/* Add more routes as needed */}
        <Route path="/signup" element={<Signup />} />

        {/* Redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* 404 route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
