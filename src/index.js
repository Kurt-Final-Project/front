import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./util/ProtectedRoute";
import UserProvider from "./util/UserProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                children: [
                    {
                        path: "",
                        element: <App />,
                    },
                    {
                        path: ":blog_id",
                        element: <Blog />,
                    },
                    {
                        path: "dashboard",
                        children: [
                            {
                                path: "",
                                element: <CreateBlog />,
                            },
                            {
                                path: "profile",
                                element: <Profile />,
                            },
                            {
                                path: "blog",
                                children: [
                                    {
                                        path: "",
                                        element: <Blogs />,
                                    },
                                    {
                                        path: ":blog_id",
                                        element: <EditBlog />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/signup",
        element: <Signup />,
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
