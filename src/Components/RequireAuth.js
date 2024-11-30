import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  // Check if user is logged in (from localStorage or any state management)
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user, redirect to login
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireAuth;
