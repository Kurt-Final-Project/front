import React from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "./UserProvider";
import Navigation from "../components/Navigation/index";
import Login from "../pages/Login";

const useAuth = () => {
    const { token } = useUser();
    return token;
};

function ProtectedRoute() {
    const isAuth = useAuth();
    return isAuth !== null ? (
        <Navigation>
            <Outlet />
        </Navigation>
    ) : (
        <Login />
    );
}

export default ProtectedRoute;
