import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../services/authService";

export default function AdminRoute() {
    if (!isLoggedIn()) return <Navigate to="/login" replace />;
    if (!isAdmin()) return <Navigate to="/perfil" replace />;
    return <Outlet />;
}