import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Topbar.css";
import profile from "../assets/profile.png";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="topbar">
      {/* Left: Title */}
      <h1 className="topbar-title">Dashboard</h1>

      {/* Right: Search + Profile */}
      <div className="topbar-right">
        <div className="search-container">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="search-input"
          />
          <i className="fa fa-search search-icon"></i>
        </div>

        {/* Profile with active badge */}
        <button
          className="profile-button"
          onClick={() => navigate("/profile")}
          aria-label="Go to profile"
        >
          <div className="profile">
            <img src={profile} alt="profile" className="avatar" />
            <span className="active-badge"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
