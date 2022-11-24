import React from "react";
import { BsPerson, BsCalendar3 } from "react-icons/bs";
import "../css/percard.css";
import { Link } from "react-router-dom";

const card = {
    id: "c1337c4b-a407-421a-868c-de3dc815ba61",
    title: "Gorgeous Concrete Towels",
    description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    cover_picture_url: "public/covers/1.png",
    creator: "Kurt Arellano",
    dateCreated: new Date().toLocaleDateString(),
};

function PerCard() {
    return (
        <div className={"wholeContainer2 p-2 float-child"}>
            <h3 className="cardContainer2">
                <Link to="/id" style={{ textDecoration: "none" }}>
                    <div className="title2">{card.title}</div>

                    <div className="imageContainer2 mt-5">
                        <img
                            className="image2"
                            src={`${process.env.REACT_APP_SERVER_URI}/${card.cover_picture_url}`}
                            alt="Italian Trulli"
                        />
                    </div>

                    <div className="descriptionContainer2 my-4">
                        <p className="description2">{card.description}</p>
                    </div>
                    <div className="">
                        <span className="cardInfo2">
                            <span className="mr-5 cardInfoSize2">
                                <BsPerson className="mr-3 cardText2" />
                                <span>{card.creator}</span>
                            </span>
                            <span className="mr-5 cardInfoSize2">
                                <BsCalendar3 className="mr-3 cardText2" />
                                <span className="">{card.dateCreated}</span>
                            </span>
                        </span>
                    </div>
                </Link>
            </h3>
        </div>
    );
}

export default PerCard;
