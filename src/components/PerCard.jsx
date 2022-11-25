import React from "react";
import { BsPerson, BsCalendar3 } from "react-icons/bs";
import "../css/percard.css";
import { Link } from "react-router-dom";

function PerCard({
    id,
    title,
    description,
    cover_picture_url,
    creator,
    dateCreated,
    updatedAt,
    is_draft,
    deleted_at,
}) {
    return (
        <div className={"wholeContainer2 p-2 float-child"}>
            <h3 className="cardContainer2">
                <Link
                    to={`/dashboard/blog/${id}`}
                    style={{ textDecoration: "none" }}
                >
                    <div className="title2">{title}</div>

                    <div className="imageContainer2 mt-5">
                        <img
                            className="image2"
                            src={`${process.env.REACT_APP_SERVER_URI}/${cover_picture_url}`}
                            alt="Italian Trulli"
                        />
                    </div>

                    <div className="descriptionContainer2 my-4">
                        <p className="description2">{description}</p>
                    </div>
                    <span className="cardInfo2 flex-container2">
                        <span className="cardInfoSize2">
                            <BsPerson className="mr-2 cardText2" />
                            <span>{creator}</span>
                        </span>
                        <span className="cardInfoSize2">
                            <BsCalendar3 className="mr-2 cardText2" />
                            <span className="">
                                {"Created: "}
                                {new Date(dateCreated).toLocaleDateString()}
                            </span>
                        </span>
                        <span className="cardInfoSize2">
                            <BsCalendar3 className="mr-2 cardText2" />
                            <span className="">
                                {"Updated: "}
                                {new Date(updatedAt).toLocaleDateString()}
                            </span>
                        </span>
                    </span>
                </Link>
            </h3>
        </div>
    );
}

export default PerCard;
