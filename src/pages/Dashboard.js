import React from "react";
import Card from "../components/Card/index";
import Navigation from "../components/Navigation";

function Dashboard() {
    document.title = "Dashboard";

    return (
        <Navigation>
            <Card />
            <Card />
            <Card />
            <Card />
        </Navigation>
    );
}

export default Dashboard;
