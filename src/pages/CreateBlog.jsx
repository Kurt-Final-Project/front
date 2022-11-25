import React, { useState, useRef } from "react";
import { MdTitle, MdOutlineDescription } from "react-icons/md";
import Input from "../components/Input/index";
import TextArea from "../components/TextArea/index";
import toaster from "../api/toaster";
import { postBlogAPI, postDraftAPI } from "../api/blogApi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../util/UserProvider";
import "../css/createblog.css";

function CreateBlog() {
    document.title = "Blog";
    const navigate = useNavigate();
    const { token } = useUser();

    const titleInput = useRef();
    const descriptionInput = useRef();
    const fileInput = useRef();

    const [filePreview, setPreview] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fileChangeHandler = (e) => {
        const src = URL.createObjectURL(e.target.files[0]);
        setUploadedFile(e.target.files[0]);
        setPreview(src);
    };

    const clickInput = (e) => {
        fileInput.current.click();
    };

    const createPost = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const title = titleInput.current.value;
        const description = descriptionInput.current.value;

        if (!title || !description || !uploadedFile)
            return toaster.error("Please fill all the fields.");

        try {
            await postBlogAPI({
                title,
                description,
                uploadedFile,
                token,
            });

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            throw err;
        }

        setIsLoading(false);
    };

    const createDraft = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const title = titleInput.current.value;
        const description = descriptionInput.current.value;

        if (!title || !description)
            return toaster.error(
                "Post cannot be saved to draft with empty fields."
            );

        try {
            await postDraftAPI({
                title,
                description,
                token,
            });

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            throw err;
        }

        setIsLoading(false);
    };

    return (
        <div className="wrapper mt-5 centermoko">
            <div className="max-width">
                <div className="pr-lg-5 mb-5 mb-md-0">
                    <h1 className="font-weight-bold">Create a blog</h1>
                    <p className="font-italic text-muted mb-4">
                        Share the world your thoughts!
                    </p>
                </div>
                <div className="row">
                    <Input
                        compStyle={"input-group col-lg-12 mb-4"}
                        icon={<MdTitle size={25} />}
                        type={"title"}
                        name={"title"}
                        placeholder={"Title"}
                        reference={titleInput}
                    />
                    <TextArea
                        compStyle={"input-group col-lg-12 mb-4"}
                        icon={<MdOutlineDescription size={25} />}
                        type={"description"}
                        name={"description"}
                        placeholder={"Description"}
                        reference={descriptionInput}
                    />
                </div>
                <form action="#" onClick={() => clickInput()} className="mb-3">
                    <img src={filePreview} className="file-max-width" />

                    <input
                        className="file-input"
                        type="file"
                        name="file"
                        ref={fileInput}
                        onChange={fileChangeHandler}
                        hidden
                    />
                    {!filePreview && <p className="p">Upload Cover Picture</p>}
                </form>
                <div className="row">
                    <div className="form-group col-lg-2 pr-0">
                        <button className="btn btn-lg mt-3 btn-block py-2 cancel-outline">
                            <span
                                className="font-weight-light"
                                onClick={(e) => navigate(-1)}
                            >
                                Cancel
                            </span>
                        </button>
                    </div>

                    <div className="form-group col-lg-5 pl-2 pr-1">
                        <button
                            className="btn btn-lg mt-3 btn-block py-2 btn-secondary"
                            onClick={(e) => createDraft(e)}
                            disabled={isLoading}
                        >
                            <span className="font-weight-light">Draft</span>
                        </button>
                    </div>

                    <div className="form-group col-lg-5 pl-1">
                        <button
                            className="btn btn-lg mt-3 text-light btn-block py-2"
                            style={{
                                backgroundColor: "#fb771a",
                            }}
                            onClick={(e) => createPost(e)}
                            disabled={isLoading}
                        >
                            <span className="font-weight-light">Post</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-5"></div>
        </div>
    );
}

export default CreateBlog;
