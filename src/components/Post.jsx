import React from "react";
import { BsPerson, BsCalendar3 } from "react-icons/bs";
import "../css/post.css";

const card = {
    id: "c1337c4b-a407-421a-868c-de3dc815ba61",
    title: "Gorgeous Concrete Towels",
    description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    cover_picture_url: "public/covers/1.png",
    creator: "Kurt Arellano",
    dateCreated: new Date().toLocaleDateString(),
};

function Post() {
    return (
        <div className="wholeContainer1 p-2 mb-4">
            <h3 className="cardContainer1">
                <div className="title1">
                    <p className="linkStyle1">{card.title}</p>
                </div>

                <div className="imageContainer1 mt-5">
                    <img
                        className="image1"
                        src={`http://localhost:8000/${card.cover_picture_url}`}
                        alt="Italian Trulli"
                    />
                    <div className="cardContainer1 positioning description-whole">
                        <div className="descriptionContainer1">
                            <p7 className="description1">{card.description}</p7>
                        </div>
                        <div className="">
                            <span className="cardInfo1">
                                <span className="mr-5 cardInfoSize1">
                                    <BsPerson className="mr-3 cardText1" />
                                    <span>{card.creator}</span>
                                </span>
                                <span className="mr-5 cardInfoSize1">
                                    <BsCalendar3 className="mr-3 cardText1" />
                                    <span className="">{card.dateCreated}</span>
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
