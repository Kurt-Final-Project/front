import React, { useState, useEffect } from "react";
import Card from "../components/Card";

function Login() {
	const [blogs, setBlogs] = useState([
		"kurt",
		"pritz",
		"francis",
		"test",
		"name2",
	]);

	const getUsers = async () => {
		try {
			const result = await fetch("http://localhost:8000/login", {
				method: "GET",
				"Content-Type": "application/json",
			});
			const data = await result.json();
			setBlogs(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<>
			{blogs.map((blog) => {
				return <Card name={blog} />;
			})}
		</>
	);
}

export default Login;
