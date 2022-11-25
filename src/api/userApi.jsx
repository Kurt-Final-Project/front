import toaster from "./toaster";

export const loginUserAPI = async ({ email, password }) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/user/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
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

export const signupUserAPI = async ({
    username,
    password,
    first_name,
    last_name,
    email,
    confirmPassword,
    uploadedFile,
}) => {
    const signupFormData = new FormData();
    signupFormData.append("username", username);
    signupFormData.append("password", password);
    signupFormData.append("confirmPassword", confirmPassword);
    signupFormData.append("first_name", first_name);
    signupFormData.append("last_name", last_name);
    signupFormData.append("email", email);
    signupFormData.append("picture", uploadedFile);

    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/user/signup`,
            {
                method: "POST",
                body: signupFormData,
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

export const getOneUserAPI = async (token) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/user/profile`,
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

export const updateUserDetailsAPI = async ({
    username,
    first_name,
    last_name,
    email,
    token,
}) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/user/profile`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    first_name,
                    last_name,
                    email,
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

export const uploadProfilePictureAPI = async ({ uploadedFile, token }) => {
    const signupFormData = new FormData();
    signupFormData.append("picture", uploadedFile);

    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/user/picture`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: signupFormData,
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

export const updateUserPasswordAPI = async ({
    oldPassword,
    password,
    confirmPassword,
    token,
}) => {
    console.log(password, oldPassword, confirmPassword);
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/api/user/profile/password`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oldPassword,
                    password,
                    confirmPassword,
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
