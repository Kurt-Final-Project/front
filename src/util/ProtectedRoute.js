import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../util/UserProvider";

const useAuth = () => {
    const { access_token } = useUser();
    return access_token;
};

function ProtectedRoute() {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
