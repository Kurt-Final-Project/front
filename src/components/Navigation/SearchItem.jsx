import React from "react";
import { useNavigate } from "react-router-dom";

function SearchItem({
    id,
    title,
    dateCreated,
    updatedAt,
    imageURL,
    reference,
    blogSetter,
}) {
    const navigate = useNavigate();

    const toBlog = (e) => {
        e.preventDefault();
        reference.current.value = "";
        blogSetter(null);
        navigate(`/${id}`);
    };

    return (
        <div className="mt-3 peritem">
            <div onClick={(e) => toBlog(e)} style={{ cursor: "pointer" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-row align-items-center ml-3 mb-3">
                        <span className="imgcont">
                            <img
                                className="imgfile"
                                src={`${process.env.REACT_APP_SERVER_URI}/${imageURL}`}
                            />
                        </span>

                        <div className="d-flex flex-column">
                            <span
                                className="mb-2"
                                style={{ wordBreak: "break-word" }}
                            >
                                {title}
                            </span>
                            <div className="d-flex flex-row align-items-center time-text">
                                <span className="dots"></span>
                                <span className="mr-5">
                                    {"Created: "}
                                    {new Date(dateCreated).toLocaleDateString()}
                                </span>
                                <span>
                                    {"Updated: "}
                                    {new Date(updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
