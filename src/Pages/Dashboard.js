import React from "react";
import MapsContainer from "../Components/MapsContainer";
const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>Sidebar</h1>
      </div>
      {/* Maps-container */}
      <div className="dashboard-container">
        <MapsContainer />
      </div>
    </div>
  );
};

export default Dashboard;

// Layout: 30% Sidebar(Fixed)
//         70% Maps + other features(scrollable)
