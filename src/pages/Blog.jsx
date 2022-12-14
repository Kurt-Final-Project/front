import React, { useState, useEffect } from "react";
import { useUser } from "../util/UserProvider";
import { getOneBlogAPI } from "../api/blogApi";
import Post from "../components/Post";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

function Blog() {
    document.title = "Blog";
    const { blog_id } = useParams();
    const { token } = useUser();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getOneBlog = async () => {
        setIsLoading(true);

        try {
            const data = await getOneBlogAPI({ blog_id, token });
            setBlog(data.blog);
            console.log(data.blog);
        } catch (err) {
            setIsLoading(false);
            throw err;
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getOneBlog();
    }, [blog_id]);

    return (
        <div>
            {blog ? (
                <Post
                    title={blog.title}
                    description={blog.description}
                    cover_picture_url={blog.cover_picture_url}
                    creator={blog.user_id.username}
                    dateCreated={blog.createdAt}
                    updatedAt={blog.updatedAt}
                    profile_picture={blog.user_id.profile_picture_url}
                />
            ) : isLoading ? (
                <Spinner />
            ) : (
                <div className="pt-5 ml-5">No blog found</div>
            )}
        </div>
    );
}

export default Blog;
