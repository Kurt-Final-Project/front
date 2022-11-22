import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import EditCreateBlog from "./pages/EditCreateBlog";
import ProtectedRoute from "./util/ProtectedRoute";
import { UserProvider } from "./util/UserProvider";

const access_token = localStorage.getItem("access_token");

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
            {
                path: "blog",
                element: <Dashboard />,
            },
            {
                path: "blog/:id",
                element: <Blog />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
