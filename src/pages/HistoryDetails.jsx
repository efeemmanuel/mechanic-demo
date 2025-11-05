import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HistoryDetails.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function HistoryDetails() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="history-order-page">
      {open && (
        <div className="history-modal-overlay">
          <div className="history-modal-card">
            {/* Header */}
            <div className="history-modal-header">
              <div className="history-order-info">
                <div className="history-order-id">#233434345</div>
                <div className="history-order-meta">
                  <div className="history-meta-item">
                    <span className="history-meta-label">Date:</span>
                    <span className="history-meta-value">06/08/2025</span>
                  </div>
                  <div className="history-meta-item">
                    <span className="history-meta-label">Status:</span>
                    <span className="history-meta-status">Completed</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                aria-label="Close"
                onClick={handleClose}
                className="history-close-btn"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <hr className="history-divider" />

            {/* Image Section */}
            <div className="history-image-section">
              <img
                src="https://images.unsplash.com/photo-1601924638867-3ec62bfc4e93?auto=format&fit=crop&w=800&q=80"
                alt="Order Preview"
              />
            </div>

            {/* Details */}
            <div className="history-modal-body">
              <div className="history-info-item">
                <div className="history-info-label">Description</div>
                <div className="history-info-value">
                  Job request for John Collins
                </div>
              </div>

              <div className="history-info-item">
                <div className="history-info-label">Location</div>
                <div className="history-info-value">
                  Saint John, opposite WDC
                </div>
              </div>

              <div className="history-info-item">
                <div className="history-info-label">Order Request</div>
                <div className="history-info-value">
                  4 Brake pad, 2 Headlight
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
