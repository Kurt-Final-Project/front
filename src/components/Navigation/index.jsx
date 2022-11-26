import React, { useState, useEffect, useRef } from "react";
import {
    BsColumns,
    BsPencil,
    BsPerson,
    BsReceiptCutoff,
    BsBoxArrowInLeft,
} from "react-icons/bs";
import { ImBlogger } from "react-icons/im";
import "./nav.css";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../util/UserProvider";
import Toaster from "../Toaster";
import SearchItem from "./SearchItem";
import { getAllBlogsAPI } from "../../api/blogApi";

function Navigation({ children }) {
    const { logoutUser, token } = useUser();
    const location = useLocation();
    const [searchItems, setSearchItems] = useState([]);
    const searchInput = useRef();

    const logout = (e) => {
        e.preventDefault();
        logoutUser();
    };

    let filterTimeout;
    const getAllBlogs = async (e) => {
        const query = e.target.value;

        clearTimeout(filterTimeout);
        if (!query) return setSearchItems([]);

        try {
            filterTimeout = setTimeout(async () => {
                const data = await getAllBlogsAPI({ token, title: query });
                setSearchItems(data.blogs);
            }, 500);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div style={{ fontSize: "20px" }}>
            <Toaster />
            <nav className="navbar navbar-expand-lg navbar-dark pb-2 pt-2 nav-color stick-top">
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
                    <ul className="navbar-nav mr-auto">
                        <li
                            className={
                                location.pathname === "/"
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            <Link className="nav-link" to="/">
                                <BsColumns /> Home
                            </Link>
                        </li>
                        <li
                            className={
                                location.pathname === "/dashboard"
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            <Link className="nav-link" to="/dashboard">
                                <BsPencil /> Create Blog
                            </Link>
                        </li>
                        <li
                            className={
                                location.pathname === "/dashboard/blog"
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            <Link className="nav-link" to="/dashboard/blog">
                                <BsReceiptCutoff /> My Blogs
                            </Link>
                        </li>
                    </ul>
                    <form className="form-inline mr-auto ml-auto pr-5">
                        <div className="parentsearch">
                            <input
                                className="form-control form-control-lg mr-sm-auto marginSearch"
                                id="colFormLabelLg"
                                type="search"
                                placeholder="Search by title"
                                aria-label="Search"
                                ref={searchInput}
                                onChange={getAllBlogs}
                            />
                            <div className="childsearch">
                                {searchItems?.length ? (
                                    <div className="marginSearch searchchildren containchild">
                                        {searchItems.map((blog, i) => {
                                            return (
                                                <SearchItem
                                                    key={i}
                                                    id={blog.id}
                                                    title={blog.title}
                                                    dateCreated={blog.createdAt}
                                                    updatedAt={blog.updatedAt}
                                                    imageURL={
                                                        blog.cover_picture_url
                                                    }
                                                    reference={searchInput}
                                                    blogSetter={setSearchItems}
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <span></span>
                                )}
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav">
                        <li
                            className={
                                location.pathname === "/dashboard/profile"
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            <Link className="nav-link" to="/dashboard/profile">
                                <BsPerson /> Profile
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link mr-2"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => logout(e)}
                            >
                                <BsBoxArrowInLeft /> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="pb-5"></div>
            <div className="pb-5"></div>

            {children}
        </div>
    );
}

export default Navigation;
