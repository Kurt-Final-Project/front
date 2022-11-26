import React, { useRef, useState } from "react";
import { signupUserAPI } from "../api/userApi";
import { MdPassword } from "react-icons/md";
import { BiUserVoice } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";
import "../css/login.css";
import "../css/fileupload.css";
import AuthNav from "../components/AuthNav";
import Input from "../components/Input/index";
import toaster from "../api/toaster";
import { useNavigate } from "react-router-dom";

function Signup() {
    document.title = "Signup";
    const navigate = useNavigate();

    const usernameInput = useRef();
    const emailInput = useRef();
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const fileInput = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [filePreview, setPreview] = useState();
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

    const signupUser = async (e) => {
        e.preventDefault();
        const username = usernameInput.current.value;
        const email = emailInput.current.value;
        const first_name = firstNameInput.current.value;
        const last_name = lastNameInput.current.value;
        const password = passwordInput.current.value;
        const confirmPassword = confirmPasswordInput.current.value;

        if (
            !email | !first_name ||
            !last_name ||
            !password ||
            !username ||
            !confirmPassword ||
            !isFilePicked
        ) {
            return toaster.error("Please fill all the fields.");
        }

        setIsLoading(true);
        try {
            await signupUserAPI({
                email,
                password,
                first_name,
                last_name,
                username,
                confirmPassword,
                uploadedFile: selectedFile,
            });
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            throw err;
        }
        setIsLoading(false);
    };

    return (
        <AuthNav title={"Login"}>
            <div className="flex-container">
                <div className="maxWidth flex-child login-container lowWidth">
                    <div className="container-fluid">
                        <div className="row mb-5">
                            <div className="col-md-5 col-lg-10">
                                <div className="row">
                                    <div className="col-lg-6 mt-5 pt-5">
                                        <div className="pt-5"></div>
                                        <div className="pt-5"></div>
                                        <div className="pt-3"></div>
                                        <h1 className="font-weight-bold pt-5">
                                            Sign up
                                        </h1>
                                        <p className="font-italic text-muted">
                                            Create an account to begin creating
                                            and browsing blogs
                                        </p>
                                    </div>
                                    <div className="input-group col-lg-6">
                                        <div className="wrapper mt-5">
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
                                        </div>
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

                                    <Input
                                        compStyle={"input-group col-lg-6 mb-4"}
                                        icon={<MdPassword size={25} />}
                                        type={"password"}
                                        name={"password"}
                                        placeholder={"Password"}
                                        reference={passwordInput}
                                    />

                                    <Input
                                        compStyle={"input-group col-lg-6 mb-4"}
                                        icon={<MdPassword size={25} />}
                                        type={"password"}
                                        name={"confirmpassword"}
                                        placeholder={"Confirm Password"}
                                        reference={confirmPasswordInput}
                                    />

                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <button
                                            className="btn btn-lg mt-3 text-light btn-block py-2"
                                            style={{
                                                backgroundColor: "#fb771a",
                                            }}
                                            onClick={(e) => signupUser(e)}
                                            disabled={isLoading}
                                        >
                                            <span className="font-weight-light">
                                                Create your account
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="picture-container">
                    <div className="flex-child">
                        <img
                            src={
                                process.env.REACT_APP_SERVER_URI +
                                "/public/covers/bg.png"
                            }
                            alt="hello"
                            className="picture"
                        />
                    </div>
                </div>
            </div>
        </AuthNav>
    );
}

export default Signup;
