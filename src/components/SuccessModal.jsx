import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/SuccessModal.css";

const SuccessModal = ({ isOpen, onClose, navigateToOrders }) => {
  if (!isOpen) return null;

  return (
    <div className="successmodal-overlay">
      <div className="successmodal-container">
        {/* Close Button */}
        <button className="successmodal-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>

        {/* Illustration */}
        <div className="successmodal-illustration">
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Success Illustration"
          />
        </div>

        {/* Content */}
        <h2 className="successmodal-title">Your order has been completed!</h2>

        <div className="successmodal-info">
          <i className="fas fa-info-circle"></i>
          <p>Your order has been successfully processed. Thank you for your trust!</p>
        </div>

        {/* Button */}
        <button className="successmodal-btn" onClick={navigateToOrders}>
          <i className="fas fa-arrow-right"></i> Go to Orders
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
