import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardContent from "../components/DashboardContent";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
