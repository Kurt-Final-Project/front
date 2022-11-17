import React from "react";
import "../index.css";

function Card(props) {
	return (
		<div style={{ color: "blue", fontWeight: style.weight }}>{props.name}</div>
	);
}

const style = {
	color: "red",
	weight: "bold",
};

export default Card;
