import React, { useState, useEffect } from "react";
import PerCard from "../components/PerCard";
import Accordion from "../components/Accordion/index";
import { useUser } from "../util/UserProvider";
import { getUserBlogsAPI } from "../api/blogApi";
import Spinner from "../components/Spinner";
import "../css/sidebyside.css";

function Blogs() {
    document.title = "User Blogs";
    const { token } = useUser();

    const [openAccordionOne, setAccordionsOne] = useState(true);
    const [openAccordionTwo, setAccordionsTwo] = useState(false);
    const [openAccordionThree, setAccordionsThree] = useState(false);

    const toggleOne = () => {
        setAccordionsOne((prev) => !prev);
    };

    const toggleTwo = () => {
        setAccordionsTwo((prev) => !prev);
    };
    const toggleThree = () => {
        setAccordionsThree((prev) => !prev);
    };

    const [postedBlogs, setPostedBlogs] = useState([]);
    const [draftedBlogs, setDraftedBlogs] = useState([]);
    const [deletedBlogs, setDeletedBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllBlogs = async () => {
        setIsLoading(true);

        try {
            const data = await getUserBlogsAPI({ token });
            setPostedBlogs(data.postedBlogs);
            setDraftedBlogs(data.draftedBlogs);
            setDeletedBlogs(data.deletedBlogs);
        } catch (err) {
            setIsLoading(false);
            throw err;
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div className="float-container mr-auto ml-auto">
            <div className="child" id="accordion" onClick={toggleOne}>
                <Accordion
                    id={"userposts"}
                    isFor={"User Posts"}
                    isOpen={openAccordionOne}
                >
                    {postedBlogs?.length ? (
                        postedBlogs.map((blog, i) => {
                            return (
                                <PerCard
                                    key={i}
                                    id={blog.id}
                                    title={blog.title}
                                    description={blog.description}
                                    cover_picture_url={blog.cover_picture_url}
                                    creator={blog.user_id.username}
                                    dateCreated={blog.createdAt}
                                    is_draft={blog.is_draft}
                                    deleted_at={blog.deleted_at}
                                    updatedAt={blog.updatedAt}
                                />
                            );
                        })
                    ) : isLoading ? (
                        <Spinner />
                    ) : (
                        <div className="pt-5 ml-5">No posted blogs found.</div>
                    )}
                </Accordion>
            </div>
            <div className="float-container">
                <div className="child" id="accordion" onClick={toggleTwo}>
                    <Accordion
                        id={"drafts"}
                        isFor={"Drafts"}
                        isOpen={openAccordionTwo}
                    >
                        {draftedBlogs?.length ? (
                            draftedBlogs.map((blog, i) => {
                                return (
                                    <PerCard
                                        key={i}
                                        id={blog.id}
                                        title={blog.title}
                                        description={blog.description}
                                        cover_picture_url={
                                            blog.cover_picture_url
                                        }
                                        creator={blog.user_id.username}
                                        dateCreated={blog.createdAt}
                                        is_draft={blog.is_draft}
                                        deleted_at={blog.deleted_at}
                                        updatedAt={blog.updatedAt}
                                    />
                                );
                            })
                        ) : isLoading ? (
                            <Spinner />
                        ) : (
                            <div className="pt-5 ml-5">
                                No draft blogs found.
                            </div>
                        )}
                    </Accordion>
                </div>
                <div className="child" id="accordion" onClick={toggleThree}>
                    <Accordion
                        id={"deleted"}
                        isFor={"Deleted"}
                        isOpen={openAccordionThree}
                    >
                        {deletedBlogs?.length ? (
                            deletedBlogs.map((blog, i) => {
                                return (
                                    <PerCard
                                        key={i}
                                        id={blog.id}
                                        title={blog.title}
                                        description={blog.description}
                                        cover_picture_url={
                                            blog.cover_picture_url
                                        }
                                        creator={blog.user_id.username}
                                        dateCreated={blog.createdAt}
                                        is_draft={blog.is_draft}
                                        deleted_at={blog.deleted_at}
                                        updatedAt={blog.updatedAt}
                                    />
                                );
                            })
                        ) : isLoading ? (
                            <Spinner />
                        ) : (
                            <div className="pt-5 ml-5">
                                No deleted blogs found.
                            </div>
                        )}
                    </Accordion>
                </div>
            </div>
            <div className="mb-5"></div>
        </div>
    );
}

export default Blogs;
