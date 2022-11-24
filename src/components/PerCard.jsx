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
                    <div className="">
                        <span className="cardInfo2">
                            <span className="mr-5 cardInfoSize2">
                                <BsPerson className="mr-3 cardText2" />
                                <span>{creator}</span>
                            </span>
                            <span className="mr-5 cardInfoSize2">
                                <BsCalendar3 className="mr-3 cardText2" />
                                <span className="">{dateCreated}</span>
                            </span>
                        </span>
                    </div>
                </Link>
            </h3>
        </div>
    );
}

export default PerCard;
