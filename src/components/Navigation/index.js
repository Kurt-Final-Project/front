import React from "react";
import {
    BsColumns,
    BsPencil,
    BsPerson,
    BsReceiptCutoff,
    BsBoxArrowInLeft,
} from "react-icons/bs";
import "./nav.css";

function Navigation({ children }) {
    return (
        <div style={{ fontSize: "20px" }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary pb-2 pt-2">
                <a
                    className="navbar-brand"
                    style={{ fontSize: "34px" }}
                    href="/"
                >
                    Bulbol
                </a>
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
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                <BsColumns /> Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <BsPencil /> Create Blog
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <BsReceiptCutoff /> My Blogs
                            </a>
                        </li>
                    </ul>
                    <form className="form-inline mr-auto pr-5">
                        <input
                            className="form-control form-control-lg mr-sm-auto marginSearch"
                            id="colFormLabelLg"
                            type="search"
                            placeholder="Search by title"
                            aria-label="Search"
                        />
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <BsPerson /> Profile
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <BsBoxArrowInLeft /> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
        </div>
    );
}

export default Navigation;
