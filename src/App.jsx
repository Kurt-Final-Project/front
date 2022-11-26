import React, { useState, useEffect, useRef } from "react";
import Card from "./components/Card";
import { getAllBlogsAPI } from "./api/blogApi";
import { useUser } from "./util/UserProvider";
import toaster from "./api/toaster";
import Spinner from "./components/Spinner";

function App() {
    const { token } = useUser();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [startingPage, setStartingPage] = useState(1);
    const [endingPage, setEndingPage] = useState(1);

    const getAllBlogs = async () => {
        setIsLoading(true);

        try {
            const data = await getAllBlogsAPI({
                token,
                page: currentPage,
                perPage: perPage,
            });
            setBlogs(data.blogs);
            setCurrentPage(data.currentPage);
            setPerPage(data.perPage);
            setHasPreviousPage(data.hasPreviousPage);
            setHasNextPage(data.hasNextPage);
            setStartingPage(data.startingPage);
            setEndingPage(data.endingPage);
        } catch (err) {
            toaster.error(err);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getAllBlogs();
    }, [currentPage]);

    const setCurrentPageTo = (i) => {
        setCurrentPage((prev) => {
            return i;
        });
    };

    return (
        <div>
            {blogs?.length ? (
                blogs.map((blog, i) => {
                    return (
                        <Card
                            key={i}
                            id={blog.id}
                            title={blog.title}
                            description={blog.description}
                            cover_picture_url={blog.cover_picture_url}
                            creator={blog.user_id.username}
                            dateCreated={blog.createdAt}
                            updatedAt={blog.updatedAt}
                        />
                    );
                })
            ) : isLoading ? (
                <Spinner />
            ) : (
                <div className="pt-5 ml-5">No blogs found.</div>
            )}

            <section className="pagination pagination-lg mb-5 mt-5">
                <div className="mx-auto">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {hasPreviousPage && (
                                <li className="page-item">
                                    <div
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage((prev) => prev - 1)
                                        }
                                    >
                                        Previous
                                    </div>
                                </li>
                            )}
                            {startingPage &&
                                endingPage &&
                                Array.from(
                                    Array(endingPage - startingPage + 1)
                                ).map((link, i) => {
                                    return (
                                        <li className="page-item" key={i}>
                                            <div
                                                className={
                                                    +startingPage + i ===
                                                    currentPage
                                                        ? "page-link active"
                                                        : "page-link"
                                                }
                                                onClick={() =>
                                                    setCurrentPageTo(
                                                        +startingPage + i
                                                    )
                                                }
                                            >
                                                {+startingPage + i}
                                            </div>
                                        </li>
                                    );
                                })}

                            {hasNextPage && (
                                <li className="page-item">
                                    <div
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage((prev) => prev + 1)
                                        }
                                    >
                                        Next
                                    </div>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    );
}

export default App;
