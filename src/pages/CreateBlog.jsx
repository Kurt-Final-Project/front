import React, { useState, useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdTitle, MdOutlineDescription } from "react-icons/md";
import Input from "../components/Input/index";
import "../css/createblog.css";

function CreateBlog() {
    document.title = "Blog";
    const titleInput = useRef();
    const descriptionInput = useRef();
    const fileInput = useRef();

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
                        ref={titleInput}
                    />
                    <Input
                        compStyle={"input-group col-lg-12 mb-4"}
                        icon={<MdOutlineDescription size={25} />}
                        type={"description"}
                        name={"description"}
                        placeholder={"Description"}
                        ref={descriptionInput}
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
                    {!isFilePicked && <p className="p">Upload Cover Picture</p>}
                </form>
                <div className="row">
                    <div className="form-group col-lg-4 pr-1">
                        <button className="btn btn-lg mt-3 btn-block py-2 cancel-outline">
                            <span className="font-weight-light">Cancel</span>
                        </button>
                    </div>

                    <div className="form-group col-lg-4 pl-1 pr-1">
                        <button className="btn btn-lg mt-3 btn-block py-2 btn-secondary">
                            <span className="font-weight-light">Draft</span>
                        </button>
                    </div>

                    <div className="form-group col-lg-4 pl-1">
                        <button
                            className="btn btn-lg mt-3 text-light btn-block py-2"
                            style={{
                                backgroundColor: "#fb771a",
                            }}
                        >
                            <span className="font-weight-light">Post</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBlog;
