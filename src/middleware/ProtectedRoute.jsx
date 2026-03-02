// src/middleware/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const asAdmin = localStorage.getItem("asAdmin");
  const asUser = localStorage.getItem("asUser");

  // Redirect if no user logged in
  if (!asAdmin && !asUser) {
    return <Navigate to="/" replace />;
  }

  // Role-based protection
  if (role === "admin" && !asAdmin) {
    return <Navigate to="/" replace />;
  }

  if (role === "user" && !asUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
