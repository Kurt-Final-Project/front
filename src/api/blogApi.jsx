import toaster from "./toaster";

export const getAllBlogsAPI = async ({ token, title, page }) => {
    try {
        const hasTitle = title
            ? `${process.env.REACT_APP_SERVER_URI}/api/blog/?title=${title}`
            : `${process.env.REACT_APP_SERVER_URI}/api/blog/?page=${page}`;

        const res = await fetch(hasTitle, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        if (!res.ok) {
            toaster.error(data.message);
            throw { message: data.message, status: 500, errors: data.errors };
        }

        return data;
    } catch (err) {
        throw err;
    }
};

export const postBlogAPI = async ({
    title,
    description,
    uploadedFile,
    token,
}) => {
    try {
        const postFormData = new FormData();
        postFormData.append("title", title);
        postFormData.append("description", description);
        postFormData.append("picture", uploadedFile);

        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/blog`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: postFormData,
            }
        );

        const data = await res.json();
        if (!res.ok) {
            toaster.error(data.message);
            throw { message: data.message, status: 500, errors: data.errors };
        }

        toaster.success(data.message);
        return data;
    } catch (err) {
        throw err;
    }
};

export const postDraftAPI = async ({ title, description, token }) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/blog/all`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            }
        );

        const data = await res.json();
        if (!res.ok) {
            toaster.error(data.message);
            throw { message: data.message, status: 500, errors: data.errors };
        }

        toaster.success(data.message);
        return data;
    } catch (err) {
        throw err;
    }
};

export const getUserBlogsAPI = async ({ token }) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/blog/all`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        if (!res.ok) {
            toaster.error(data.message);
            throw { message: data.message, status: 500, errors: data.errors };
        }

        return data;
    } catch (err) {
        throw err;
    }
};

export const getOneBlogAPI = async ({ blog_id, token }) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/blog/${blog_id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        if (!res.ok) {
            toaster.error(data.message);
            throw { message: data.message, status: 500, errors: data.errors };
        }

        return data;
    } catch (err) {
        throw err;
    }
};

export const updateOneBlogAPI = async ({
    blog_id,
    title,
    description,
    uploadedFile,
    token,
}) => {
    try {
        const postFormData = new FormData();
        postFormData.append("title", title);
        postFormData.append("description", description);
        postFormData.append("picture", uploadedFile);

        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/blog/${blog_id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: postFormData,
            }
        );

        const data = await res.json();
        if (!res.ok) {
            toaster.error(data.message);
            throw { message: data.message, status: 500, errors: data.errors };
        }

        toaster.success(data.message);
        return data;
    } catch (err) {
        throw err;
    }
};

export const deleteOneBlogAPI = async ({ blog_id, token }) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/blog/${blog_id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        if (!res.ok) {
            toaster.error(data.message);
            throw { message: data.message, status: 500, errors: data.errors };
        }

        toaster.success(data.message);
        return data;
    } catch (err) {
        throw err;
    }
};
