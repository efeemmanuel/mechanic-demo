import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/HistoryModal.css";

export default function HistoryModal() {
  return (
    <div className="historymodal-overlay">
      <div className="historymodal-container">
        {/* Close Button */}
        <button className="historymodal-close">
          <i className="fas fa-times"></i>
        </button>

        <div className="historymodal-options">
          {/* Order History */}
          <button className="historymodal-option-btn">
            <div className="historymodal-option-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
                alt="Order History"
                className="historymodal-icon"
              />
              <div>
                <h3 className="historymodal-title">Order history</h3>
                <p className="historymodal-text">
                  Select to see all order history here
                </p>
              </div>
            </div>
          </button>

          {/* Procure Parts History */}
          <button className="historymodal-option-btn">
            <div className="historymodal-option-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
                alt="Procure Parts"
                className="historymodal-icon"
              />
              <div>
                <h3 className="historymodal-title">Procure parts history</h3>
                <p className="historymodal-text">
                  Select to see all auto procure history here
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
