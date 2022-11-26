import React, { useState, useEffect, useRef } from "react";
import {
    getOneUserAPI,
    updateUserDetailsAPI,
    updateUserPasswordAPI,
    uploadProfilePictureAPI,
} from "../api/userApi";
import { useUser } from "../util/UserProvider";
import { MdPassword } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";
import { BiUserVoice } from "react-icons/bi";
import Input from "../components/Input/index";
import { useNavigate } from "react-router-dom";
import toaster from "../api/toaster";
import "../css/profile.css";
import "../css/fileupload.css";

function Profile() {
    document.title = "Profile";
    const { token } = useUser();
    const navigate = useNavigate();

    const usernameInput = useRef();
    const emailInput = useRef();
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const oldPasswordInput = useRef();
    const newPasswordInput = useRef();
    const confirmPasswordInput = useRef();
    const fileInput = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [filePreview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const fileChangeHandler = (e) => {
        const src = URL.createObjectURL(e.target.files[0]);
        setPreview(src);
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    };

    const clickInput = (e) => {
        fileInput.current.click();
    };

    const [user, setUser] = useState();

    const getOneUser = async () => {
        setIsLoading(true);

        try {
            const data = await getOneUserAPI(token);
            const src = `${process.env.REACT_APP_SERVER_URI}/${data.user.profile_picture_url}`;
            setUser(data.user);
            usernameInput.current.value = data.user.username;
            emailInput.current.value = data.user.email;
            firstNameInput.current.value = data.user.first_name;
            lastNameInput.current.value = data.user.last_name;
            setPreview(src);
        } catch (err) {
            setIsLoading(false);
            throw err;
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getOneUser(); // eslint-disable-next-line
    }, []);

    const updateUserPicture = async (e) => {
        e.preventDefault();

        if (!selectedFile) return toaster.error("Please upload new picture.");

        setIsLoading(true);

        try {
            await uploadProfilePictureAPI({
                uploadedFile: selectedFile,
                token,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            throw err;
        }

        setIsLoading(false);
    };

    const updateUserDetails = async (e) => {
        e.preventDefault();

        const username = usernameInput.current.value;
        const email = emailInput.current.value;
        const first_name = firstNameInput.current.value;
        const last_name = lastNameInput.current.value;

        if (!username || !email || !first_name || !last_name)
            return toaster.error(
                "Please fill all the fields to updated user details."
            );

        if (
            username === user.username &&
            email === user.email &&
            first_name === user.first_name &&
            last_name === user.last_name
        )
            return;

        setIsLoading(true);

        try {
            await updateUserDetailsAPI({
                username,
                email,
                first_name,
                last_name,
                token,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            throw err;
        }

        setIsLoading(false);
    };

    const updateUserPassword = async (e) => {
        e.preventDefault();

        const oldPassword = oldPasswordInput.current.value;
        const password = newPasswordInput.current.value;
        const confirmPassword = confirmPasswordInput.current.value;

        if (!oldPassword || !password || !confirmPassword)
            return toaster.error(
                "Please fill all the fields to update password."
            );
        setIsLoading(true);

        try {
            await updateUserPasswordAPI({
                oldPassword,
                password,
                confirmPassword,
                token,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            throw err;
        }

        setIsLoading(false);
    };

    return (
        <div className="profile-container">
            <div className="container-fluid">
                <div className="row mb-5">
                    <div className="col-md-5 col-lg-12">
                        <div className="row">
                            <div className="input-group col-lg-12">
                                <div className="wrapper mt-5 ml-auto mr-auto">
                                    <form
                                        action="#"
                                        onClick={() => clickInput()}
                                    >
                                        <img
                                            src={filePreview}
                                            className="file-max-width"
                                        />

                                        <input
                                            className="file-input"
                                            type="file"
                                            name="file"
                                            ref={fileInput}
                                            onChange={fileChangeHandler}
                                            hidden
                                        />
                                        {!isFilePicked && (
                                            <p className="p">
                                                Upload Profile Picture
                                            </p>
                                        )}
                                    </form>
                                    <button
                                        href="#"
                                        className="btn btn-lg mt-3 text-light btn-block py-2"
                                        style={{
                                            backgroundColor: "#fb771a",
                                        }}
                                        onClick={(e) => updateUserPicture(e)}
                                    >
                                        <span className="font-weight-light">
                                            Update Picture
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="col-lg-12 mb-4">
                                <h2>User details</h2>
                                <div className="line"></div>
                            </div>

                            <Input
                                compStyle={"input-group col-lg-6 mb-4"}
                                icon={<RiUserLine size={25} />}
                                type={"text"}
                                name={"firstname"}
                                placeholder={"First Name"}
                                reference={firstNameInput}
                            />

                            <Input
                                compStyle={"input-group col-lg-6 mb-4"}
                                icon={<RiUserLine size={25} />}
                                type={"text"}
                                name={"lastname"}
                                placeholder={"Last Name"}
                                reference={lastNameInput}
                            />

                            <Input
                                compStyle={"input-group col-lg-12 mb-4"}
                                icon={<BiUserVoice size={30} />}
                                type={"text"}
                                name={"username"}
                                placeholder={"Username"}
                                reference={usernameInput}
                            />

                            <Input
                                compStyle={"input-group col-lg-12 mb-4"}
                                icon={<HiOutlineMail size={25} />}
                                type={"text"}
                                name={"email"}
                                placeholder={"Email Address"}
                                reference={emailInput}
                            />

                            <div className="form-group col-lg-12 mx-auto mb-0">
                                <button
                                    href="#"
                                    className="btn btn-lg mt-3 text-light btn-block py-2"
                                    style={{
                                        backgroundColor: "#fb771a",
                                    }}
                                    onClick={(e) => updateUserDetails(e)}
                                >
                                    <span className="font-weight-light">
                                        Update Details
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <h2>Update password</h2>
                        <div className="line"></div>
                    </div>

                    <Input
                        compStyle={"input-group col-lg-4 mb-4"}
                        icon={<MdPassword size={25} />}
                        type={"password"}
                        name={"oldpassword"}
                        placeholder={"Old Password"}
                        reference={oldPasswordInput}
                    />

                    <Input
                        compStyle={"input-group col-lg-4 mb-4"}
                        icon={<MdPassword size={25} />}
                        type={"password"}
                        name={"newpassword"}
                        placeholder={"New Password"}
                        reference={newPasswordInput}
                    />

                    <Input
                        compStyle={"input-group col-lg-4 mb-4"}
                        icon={<MdPassword size={25} />}
                        type={"password"}
                        name={"confirmpassword"}
                        placeholder={"Confirm Password"}
                        reference={confirmPasswordInput}
                    />

                    <div className="form-group col-lg-12 mx-auto mb-5">
                        <button
                            href="#"
                            className="btn btn-lg mt-3 text-light btn-block py-2"
                            style={{
                                backgroundColor: "#fb771a",
                            }}
                            onClick={(e) => updateUserPassword(e)}
                        >
                            <span className="font-weight-light">
                                Update Password
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
