import React, { useState, useEffect, useRef } from "react";
import { getOneUserAPI } from "../api/userApi";
import { useUser } from "../util/UserProvider";
import { MdPassword } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";
import { BiUserVoice } from "react-icons/bi";
import Input from "../components/Input/index";
import "../css/profile.css";
import "../css/fileupload.css";

function Profile() {
    document.title = "Profile";
    const { token } = useUser();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const usernameInput = useRef();
    const emailInput = useRef();
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const oldPasswordInput = useRef();
    const newPasswordInput = useRef();
    const confirmPasswordInput = useRef();
    const fileInput = useRef();

    const [filePreview, setPreview] = useState(
        `${process.env.REACT_APP_SERVER_URI}/public/covers/1.png`
    );

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
        setError(false);
        setSuccess(true);

        try {
            const data = await getOneUserAPI(token);
            setSuccess(data.message);
            setUser(data.user);
        } catch (err) {
            setError(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getOneUser(); // eslint-disable-next-line
    }, [token]);

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
                                            alt="preview"
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
                                ref={firstNameInput}
                            />

                            <Input
                                compStyle={"input-group col-lg-6 mb-4"}
                                icon={<RiUserLine size={25} />}
                                type={"text"}
                                name={"lastname"}
                                placeholder={"Last Name"}
                                ref={lastNameInput}
                            />

                            <Input
                                compStyle={"input-group col-lg-12 mb-4"}
                                icon={<BiUserVoice size={30} />}
                                type={"text"}
                                name={"username"}
                                placeholder={"Username"}
                                ref={usernameInput}
                            />

                            <Input
                                compStyle={"input-group col-lg-12 mb-4"}
                                icon={<HiOutlineMail size={25} />}
                                type={"text"}
                                name={"email"}
                                placeholder={"Email Address"}
                                ref={emailInput}
                            />

                            <div className="form-group col-lg-12 mx-auto mb-0">
                                <button
                                    href="#"
                                    className="btn btn-lg mt-3 text-light btn-block py-2"
                                    style={{
                                        backgroundColor: "#fb771a",
                                    }}
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
                        ref={oldPasswordInput}
                    />

                    <Input
                        compStyle={"input-group col-lg-4 mb-4"}
                        icon={<MdPassword size={25} />}
                        type={"password"}
                        name={"newpassword"}
                        placeholder={"New Password"}
                        ref={newPasswordInput}
                    />

                    <Input
                        compStyle={"input-group col-lg-4 mb-4"}
                        icon={<MdPassword size={25} />}
                        type={"password"}
                        name={"confirmpassword"}
                        placeholder={"Confirm Password"}
                        ref={confirmPasswordInput}
                    />

                    <div className="form-group col-lg-12 mx-auto mb-5">
                        <button
                            href="#"
                            className="btn btn-lg mt-3 text-light btn-block py-2"
                            style={{
                                backgroundColor: "#fb771a",
                            }}
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
