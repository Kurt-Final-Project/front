import React from "react";
import { BsPerson, BsCalendar3 } from "react-icons/bs";
import "../css/card.css";
import { Link } from "react-router-dom";

function Card({
    id,
    title,
    description,
    cover_picture_url,
    creator,
    dateCreated,
    updatedAt,
}) {
    return (
        <div className="wholeContainer p-2">
            <h3 className="cardContainer">
                <Link to={`/${id}`} style={{ textDecoration: "none" }}>
                    <div className="title">
                        <p className="linkStyle">{title}</p>
                    </div>

                    <div className="imageContainer mt-5">
                        <img
                            className="image"
                            src={`${process.env.REACT_APP_SERVER_URI}/${cover_picture_url}`}
                            alt="Italian Trulli"
                        />
                    </div>

                    <div className="descriptionContainer my-4">
                        <p className="description">{description}</p>
                    </div>
                    <span className="cardInfo flexcontainer">
                        <span className="cardInfoSize">
                            <BsPerson className="mr-2 cardText" />
                            <span>{creator}</span>
                        </span>
                        <span className="cardInfoSize">
                            <BsCalendar3 className="mr-2 cardText" />
                            <span className="">
                                {"Created: "}
                                {new Date(dateCreated).toLocaleDateString()}
                            </span>
                        </span>
                        <span className="cardInfoSize">
                            <BsCalendar3 className="mr-2 cardText" />
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

export default Card;
