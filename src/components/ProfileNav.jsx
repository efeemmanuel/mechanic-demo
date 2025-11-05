import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Profile.css";

const ProfileNav = () => {
  return (
    <header className="profile-header">
      {/* ===== Header Top ===== */}
      <div className="profile-header-top">
        <div className="profile-header-title-wrapper">
          
          <h1>Account</h1>
        </div>
      </div>

      {/* ===== Navigation Tabs ===== */}
      <div className="profile-tab-navigation">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `profile-tab-btn ${isActive ? "profile-tab-btn-active" : ""}`
          }
        >
          <i className="fa-solid fa-user"></i> My profile
        </NavLink>

        <NavLink
          to="/edit-profile"
          className={({ isActive }) =>
            `profile-tab-btn ${isActive ? "profile-tab-btn-active" : ""}`
          }
        >
          <i className="fa-solid fa-pen"></i> Edit profile
        </NavLink>

        <NavLink
          to="/change-password"
          className={({ isActive }) =>
            `profile-tab-btn ${isActive ? "profile-tab-btn-active" : ""}`
          }
        >
          <i className="fa-solid fa-lock"></i> Change password
        </NavLink>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            `profile-tab-btn ${isActive ? "profile-tab-btn-active" : ""}`
          }
        >
          <i className="fa-solid fa-headset"></i> Support
        </NavLink>

        {/* <NavLink
          to="/profile/help-center"
          className={({ isActive }) =>
            `profile-tab-btn ${isActive ? "profile-tab-btn-active" : ""}`
          }
        >
          <i className="fa-solid fa-circle-question"></i> Help center
        </NavLink> */}

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `profile-tab-btn ${isActive ? "profile-tab-btn-active" : ""}`
          }
        >
          <i className="fa-solid fa-right-from-bracket"></i> Sign out
        </NavLink>
      </div>
    </header>
  );
};

export default ProfileNav;
