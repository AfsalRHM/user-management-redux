import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { PrivateRoute } from "./components/privateRoute";
import AdminSignIn from "./pages/adminSignIn";
import AdminHome from "./pages/adminHome";
import AdminDashboard from "./pages/adminDashboard";

// Separate component to use inside the BrowserRouter
function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/admin-sign-in" &&
        location.pathname !== "/admin" &&
        location.pathname !== "/admin-dashboard" && <Header />}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin-sign-in" element={<AdminSignIn />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

// BrowserRouter is outside of AppContent to allow useLocation to work
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
