import React, { useRef, useState } from "react";
import { loginUserAPI } from "../api/userApi";
import { useUser } from "../util/UserProvider";
import { MdPassword } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import "../css/login.css";
import AuthNav from "../components/AuthNav/index";
import Input from "../components/Input/index";
import Toaster from "../components/Toaster";
import toaster from "../api/toaster";

function Login() {
    document.title = "Login";
    const { setUserToken } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const emailInput = useRef();
    const passwordInput = useRef();

    const loginUser = async (e) => {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        if (!email || !password)
            return toaster.error("Please fill all the fields.");

        setIsLoading(true);

        try {
            const data = await loginUserAPI({
                email,
                password,
            });
            setTimeout(() => {
                setUserToken(data.token);
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            throw err;
        }
        setIsLoading(false);
    };

    return (
        <AuthNav title={"Signup"}>
            <Toaster />
            <div className="flex-container mb-auto mt-auto">
                <div className="maxWidth flex-child login-container lowWidth">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-7 col-lg-10">
                                <div className="pr-lg-5 mb-5 mb-md-0">
                                    <h1 className="font-weight-bold">
                                        Login to your account
                                    </h1>
                                    <p className="font-italic text-muted mb-5">
                                        Welcome to Blogcast Newsletter. Start
                                        blogging today!
                                    </p>
                                </div>
                                <form action="#">
                                    <div className="row">
                                        <Input
                                            compStyle={
                                                "input-group col-lg-12 mb-4"
                                            }
                                            icon={<HiOutlineMail size={25} />}
                                            type={"email"}
                                            name={"email"}
                                            placeholder={"Email Address"}
                                            reference={emailInput}
                                        />

                                        <Input
                                            compStyle={
                                                "input-group col-lg-12 mb-4"
                                            }
                                            icon={<MdPassword size={25} />}
                                            type={"password"}
                                            name={"password"}
                                            placeholder={"Password"}
                                            reference={passwordInput}
                                        />

                                        <div className="form-group col-lg-12 mx-auto mb-0">
                                            <button
                                                className="btn btn-lg mt-3 text-light btn-block py-2"
                                                style={{
                                                    backgroundColor: "#fb771a",
                                                }}
                                                onClick={(e) => loginUser(e)}
                                                disabled={isLoading}
                                            >
                                                <span className="font-weight-light">
                                                    Login
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="picture-container">
                    <div className="flex-child">
                        <img
                            src={`${process.env.REACT_APP_SERVER_URI}/public/covers/bg.png`}
                            alt="hello"
                            className="picture"
                        />
                    </div>
                </div>
            </div>
        </AuthNav>
    );
}

export default Login;
