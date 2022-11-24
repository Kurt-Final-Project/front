import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { getAllBlogsAPI } from "./api/blogApi";
import { useUser } from "./util/UserProvider";
import toaster from "./api/toaster";
import Spinner from "./components/Spinner";

function App() {
    const { token } = useUser();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllBlogs = async () => {
        setIsLoading(true);

        try {
            const data = await getAllBlogsAPI({ token });
            setBlogs(data.blogs);
        } catch (err) {
            toaster.error(err);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getAllBlogs();
    }, [token]);

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
                        />
                    );
                })
            ) : isLoading ? (
                <Spinner />
            ) : (
                <div className="pt-5 ml-5">No blogs found.</div>
            )}
        </div>
    );
}

export default App;
