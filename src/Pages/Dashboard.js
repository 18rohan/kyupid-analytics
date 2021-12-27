import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">Sidebar</div>
      {/* Maps-container */}
      <div className="maps-container">Maps Container</div>
    </div>
  );
};

export default Dashboard;

// Layout: 30% Sidebar(Fixed)
//         70% Maps + other features(scrollable)
