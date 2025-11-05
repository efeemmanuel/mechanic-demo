import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardContent.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const DashboardContent = () => {
  const history = [
    { ref: "2232323", item: "Electrical Repair", status: "Ongoing", amount: "₦5,000" },
    { ref: "4456789", item: "Air Conditioner Fix", status: "Completed", amount: "₦8,500" },
    { ref: "7788990", item: "Lighting Installation", status: "Cancelled", amount: "₦3,200" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Ongoing":
        return "status ongoing";
      case "Completed":
        return "status completed";
      case "Cancelled":
        return "status cancelled";
      default:
        return "status";
    }
  };

  return (
    <div className="dashboard-content">
      {/* ===== Top Section ===== */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="left-column">
          <h2 className="greeting">Good morning, John 👋</h2>
          <p className="subtitle">What would you like to do today?</p>

          <div className="action-cards">
            <Link to="/new-orders" className="action-card card-blue">
              <span>New Orders</span>
              <i className="fas fa-plus-circle card-icon"></i>
            </Link>

            <Link to="/procure-page" className="action-card card-orange">
              <span>Get Auto Parts</span>
              <i className="fas fa-car-battery card-icon"></i>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="pending-box">
            <h4 className="pending-title">Ongoing Orders</h4>
            <div className="pending-item">
              <div className="pending-texts">
                <span className="pending-main">John Collins Order</span>
                <small className="pending-sub">order request with car model</small>
              </div>

              <Link to="/ongoing" className="view-btn">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Second Row ===== */}
      <div className="dashboard-grid second-row">
        {/* Recent Chats */}
        <div className="left-column">
          <h4 className="section-title">Recent Chats</h4>
          {[1, 2].map((i) => (
            <div className="chat-item" key={i}>
              <img src="/chat-avatar.png" alt="Workshop" className="chat-avatar" />
              <div className="chat-texts">
                <span className="chat-main">John Collins</span>
                <small className="chat-sub">I have been experiencing leakage...</small>
              </div>
              <Link to={`/chat/${i}`} className="resume-btn">
                Resume
              </Link>
            </div>
          ))}
        </div>

        {/* Quick Activities */}
        <div className="right-column">
          <h4 className="section-title">Quick Activities</h4>
          <div className="quick-buttons">
            <Link to="/order-today" className="quick-btn">
              <i className="fas fa-wrench btn-icon"></i>
              Order Today
            </Link>
            <Link to="/order-history" className="quick-btn">
              <i className="fas fa-history btn-icon"></i>
              Add Order History
            </Link>
            <Link to="/profile" className="quick-btn">
              <i className="fas fa-user btn-icon"></i>
              View Profile
            </Link>
          </div>
        </div>
      </div>

      {/* ===== History Section ===== */}
      <div className="history-section">
        <div className="history-header-bar">
          <h4 className="section-title">Order History</h4>
        </div>

        <div className="history-scroll">
          <div className="history-table">
            <div className="history-header">
              <span>Ref</span>
              <span>Items</span>
              <span>Status</span>
              <span>Amount</span>
            </div>

            {history.map((row) => (
              <Link key={row.ref} to={`/history/${row.ref}`} className="history-row clickable">
                <span>{row.ref}</span>
                <span>{row.item}</span>
                <span className={getStatusClass(row.status)}>{row.status}</span>
                <span>{row.amount}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
