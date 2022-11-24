import React, { useState } from "react";
import PerCard from "../components/PerCard";
import "../css/sidebyside.css";
import Accordion from "../components/Accordion/index";

function Blogs() {
    document.title = "User Blogs";
    const [openAccordionOne, setAccordionsOne] = useState(true);
    const [openAccordionTwo, setAccordionsTwo] = useState(false);
    const [openAccordionThree, setAccordionsThree] = useState(false);

    const toggleOne = () => {
        setAccordionsOne((prev) => !prev);
    };

    const toggleTwo = () => {
        setAccordionsTwo((prev) => !prev);
    };
    const toggleThree = () => {
        setAccordionsThree((prev) => !prev);
    };

    return (
        <div className="float-container mr-auto ml-auto">
            <div className="child" id="accordion" onClick={toggleOne}>
                <Accordion
                    id={"userposts"}
                    isFor={"User Posts"}
                    isOpen={openAccordionOne}
                >
                    <PerCard />
                    <PerCard />
                    <PerCard />
                </Accordion>
            </div>
            <div className="float-container">
                <div className="child" id="accordion" onClick={toggleTwo}>
                    <Accordion
                        id={"drafts"}
                        isFor={"Drafts"}
                        isOpen={openAccordionTwo}
                    >
                        <PerCard />
                        <PerCard />
                        <PerCard />
                    </Accordion>
                </div>
                <div className="child" id="accordion" onClick={toggleThree}>
                    <Accordion
                        id={"deleted"}
                        isFor={"Deleted"}
                        isOpen={openAccordionThree}
                    >
                        <PerCard />
                        <PerCard />
                        <PerCard />
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
