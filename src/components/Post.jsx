import React from "react";
import { BsPerson, BsCalendar3 } from "react-icons/bs";
import "../css/post.css";

function Post({
    title,
    description,
    cover_picture_url,
    creator,
    dateCreated,
    updatedAt,
}) {
    return (
        <div className="wholeContainer1 p-2 mb-4">
            <h3 className="cardContainer1">
                <div className="title1">
                    <p className="linkStyle1">{title}</p>
                </div>

                <div className="imageContainer1 mt-5">
                    <img
                        className="image1"
                        src={`${process.env.REACT_APP_SERVER_URI}/${cover_picture_url}`}
                        alt="Italian Trulli"
                    />
                    <div className="cardContainer1 positioning description-whole">
                        <div className="descriptionContainer1">
                            <p className="description1">{description}</p>
                        </div>
                        <div className="">
                            <span className="cardInfo1">
                                <span className="mr-5 cardInfoSize1">
                                    <BsPerson className="mr-3 cardText1" />
                                    <span>{creator}</span>
                                </span>
                                <span className="mr-5 cardInfoSize1">
                                    <BsCalendar3 className="mr-3 cardText1" />
                                    <span className="">
                                        {"Created: "}
                                        {new Date(
                                            dateCreated
                                        ).toLocaleDateString()}
                                    </span>
                                </span>

                                <span className="mr-5 cardInfoSize1">
                                    <BsCalendar3 className="mr-3 cardText1" />
                                    <span className="">
                                        {"Updated: "}
                                        {new Date(
                                            dateCreated
                                        ).toLocaleDateString()}
                                    </span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </h3>
        </div>
    );
}

export default Post;
