import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Auto-open Orders if route matches
  useEffect(() => {
    if (
      location.pathname.startsWith("/find-mechanic") ||
      location.pathname.startsWith("/get-auto-parts") ||
      location.pathname.startsWith("/charge-ev")
    ) {
      setOrdersOpen(true);
    }
  }, [location]);

  // Lock scroll when sidebar open (mobile)
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className={`sidebar-toggle ${sidebarOpen ? "open" : ""}`}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        onClick={() => setSidebarOpen((v) => !v)}
      >
        <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`} />
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <nav className="sidebar-scroll">
          <ul className="sidebar-menu">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
                onClick={closeSidebar}
              >
                <i className="fa-regular fa-window-maximize left" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* Orders dropdown */}
            <li
              className={`menu-item expandable ${ordersOpen ? "active" : ""}`}
              onClick={() => setOrdersOpen((v) => !v)}
            >
              <div className="left-pack">
                <i className="fa-regular fa-rectangle-list left" />
                <span>Orders</span>
              </div>
              <i
                className={`fas ${
                  ordersOpen ? "fa-chevron-up" : "fa-chevron-down"
                } right`}
              />
            </li>
            <ul className={`submenu ${ordersOpen ? "open" : ""}`}>
              <li>
                <NavLink
                  to="/new-orders"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebar}
                >
                  New Orders
                </NavLink>
              </li>
              <li>
                {/* <NavLink
                  to="/procure-page"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebar}
                >
                  Ongoing Orders
                </NavLink> */}
              </li>
              {/* <li>
                <NavLink
                  to="/charge-ev"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebar}
                >
                  Completed Orders
                </NavLink>
              </li> */}
            </ul>

            {/* Others */}
            <li>
              <NavLink
                to="/procure-page"
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
                onClick={closeSidebar}
              >
                <i className="fa-regular fa-clock left" />
                <span>Procure Auto Parts</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
                onClick={closeSidebar}
              >
                <i className="fa-regular fa-clock left" />
                <span>History</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
                onClick={closeSidebar}
              >
                <i className="fa-regular fa-comments left" />
                <span>Active Chats</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Profile button (goes to /profile) */}
        <button
          className={`sidebar-profile ${profileOpen ? "active" : ""}`}
          onClick={() => {
            navigate("/profile");
            closeSidebar();
          }}
        >
          <div className="profile-main">
            <img
              src="https://via.placeholder.com/32"
              alt="profile"
              className="avatar"
            />
            <span className="username">John Doe</span>
          </div>
          <i className="fas fa-user right" />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
