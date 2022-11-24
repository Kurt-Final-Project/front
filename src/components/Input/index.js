import React from "react";

function Index({ icon, compStyle, type, name, placeholder, reference }) {
    return (
        <div className={compStyle}>
            <div className="input-group-prepend">
                <span className="input-group-text bg-white px-4 border-md border-right-0">
                    <i className="text-muted">{icon}</i>
                </span>
            </div>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                className="form-control form-control-lg bg-white border-left-0 border-md"
                ref={reference}
            />
        </div>
    );
}

export default Index;
