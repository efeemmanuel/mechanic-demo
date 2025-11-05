import React from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/DeleteModal.css";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Perform your reject logic first
    if (onConfirm) onConfirm();

    // Then redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="deletemodal-overlay">
      <div className="deletemodal-container">
        {/* Close Button */}
        <button className="deletemodal-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>

        {/* Warning Icon */}
        <div className="deletemodal-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>

        {/* Text */}
        <h2 className="deletemodal-title">Reject Order?</h2>
        <p className="deletemodal-message">
          Are you sure you want to reject this order?  
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="deletemodal-actions">
          <button className="deletemodal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="deletemodal-btn confirm" onClick={handleConfirm}>
            <i className="fas fa-trash"></i> Reject Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
