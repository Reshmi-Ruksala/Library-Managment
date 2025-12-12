import React from "react";        // <-- This gives access to React.ReactNode
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;  // <-- This is where React.ReactNode comes from
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;

  return <>{children}</>;
}
