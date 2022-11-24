import React from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

function Index({ id, isFor, children, isOpen }) {
    return (
        <div>
            <div
                className="collapsed bg"
                data-target={"#" + id}
                aria-expanded="true"
                aria-controls={id}
            >
                <div
                    className="linkStyle3 text-left"
                    style={{ cursor: "pointer" }}
                >
                    {isFor}
                    <i className="ml-5">
                        {isOpen ? (
                            <AiFillCaretDown size={20} />
                        ) : (
                            <AiFillCaretRight size={20} />
                        )}
                    </i>
                </div>
            </div>
            <div
                id={id}
                className={isOpen ? "collapse show" : "collapse"}
                aria-labelledby={id}
                data-parent="#accordion"
            >
                {children}
            </div>
        </div>
    );
}

export default Index;
