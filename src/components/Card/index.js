import React from "react";
import "./card.css";
import { BsPerson, BsCalendar3 } from "react-icons/bs";

const card = {
    id: "c1337c4b-a407-421a-868c-de3dc815ba61",
    title: "Gorgeous Concrete Towels",
    description:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    cover_picture_url: "public/covers/1.png",
    creator: "Kurt Arellano",
    dateCreated: new Date().toLocaleDateString(),
};

function Card() {
    return (
        <div className="wholeContainer p-2 mb-4 mt-3">
            <h3 className="cardContainer mt-3">
                <div className="title">
                    <a href="/" className="linkStyle">
                        {card.title}
                    </a>
                </div>

                <div className="imageContainer mt-5">
                    <img
                        className="image"
                        src={`http://localhost:8000/${card.cover_picture_url}`}
                        alt="Italian Trulli"
                    />
                </div>

                <div className="descriptionContainer my-4">
                    <p7 className="description">{card.description}</p7>
                </div>
                <div className="mb">
                    <span className="cardInfo">
                        <span className="mr-5 cardInfoSize">
                            <BsPerson className="mr-3 cardText" />
                            <span>{card.creator}</span>
                        </span>
                        <span className="mr-5 cardInfoSize">
                            <BsCalendar3 className="mr-3 cardText" />
                            <span className="">{card.dateCreated}</span>
                        </span>
                    </span>
                </div>
            </h3>
        </div>
    );
}

export default Card;
