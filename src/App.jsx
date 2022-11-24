import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { getAllBlogsAPI } from "./api/blogApi";
import { useUser } from "./util/UserProvider";

function App() {
    const { token } = useUser();

    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getAllBlogs = async () => {
        setIsLoading(true);
        setError(false);
        setSuccess(true);

        try {
            const data = await getAllBlogsAPI({ token });
            setBlogs(data.blogs);
            setSuccess(data.message);
            console.log(data.blogs);
        } catch (err) {
            setError(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getAllBlogs();
    }, [token]);

    return (
        <div>
            {blogs
                ? blogs.map((blog) => {
                      return (
                          <Card
                              id={blog.id}
                              title={blog.title}
                              description={blog.description}
                              cover_picture_url={blog.cover_picture_url}
                              creator={blog.user_id.username}
                              dateCreated={blog.createdAt}
                          />
                      );
                  })
                : "No blogs found!"}
        </div>
    );
}

export default App;
