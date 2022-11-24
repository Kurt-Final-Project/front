import React from "react";
import { ImBlogger } from "react-icons/im";
import { Link } from "react-router-dom";
import "../Navigation/nav.css";

function AuthNav({ children, title }) {
    return (
        <div style={{ fontSize: "20px" }}>
            <nav className="navbar navbar-expand-lg navbar-dark pb-2 pt-2 nav-color">
                <Link
                    className="navbar-brand ml-2"
                    style={{ fontSize: "34px" }}
                    to="/"
                >
                    <ImBlogger className="mr-2" /> Blogcast
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto"></ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link mr-2 active "
                                to={title === "Signup" ? "/signup" : "/"}
                            >
                                {title}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
        </div>
    );
}

export default AuthNav;
