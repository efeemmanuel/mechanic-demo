// import React from "react";
// import "../styles/SummaryModal.css";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

// const SummaryModal = ({
//   isOpen,
//   onClose,
//   vehicleType,
//   manualOrders,
//   uploadedFiles,
//   onNext,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-card">
//         {/* Header */}
//         <div className="modal-header">
//           <h2 className="modal-title">
//             <i className="fas fa-list-check"></i> Order Summary
//           </h2>

//           <button className="close-btn" onClick={onClose} aria-label="Close">
//             <i className="fas fa-times"></i>
//           </button>
//         </div>

//         <hr className="divider" />

//         {/* Summary Content */}
//         <div className="modal-body">
//           {/* Vehicle Type */}
//           <div className="info-item">
//             <span className="info-label">Vehicle Type:</span>
//             <span className="info-value">{vehicleType || "None selected"}</span>
//           </div>

//           {/* Orders */}
//           <div className="info-item">
//             <span className="info-label">Orders:</span>
//             <div className="info-list">
//               {manualOrders && manualOrders.length > 0 ? (
//                 manualOrders.map((order, idx) => (
//                   <div key={idx} className="list-item">
//                     <i className="fas fa-tools"></i> {order}
//                   </div>
//                 ))
//               ) : (
//                 <div className="empty">No orders added</div>
//               )}
//             </div>
//           </div>

//           {/* Attachments */}
//           <div className="info-item">
//             <span className="info-label">Attachments:</span>
//             <div className="info-list">
//               {uploadedFiles && uploadedFiles.length > 0 ? (
//                 Array.from(uploadedFiles).map((file, idx) => (
//                   <div key={idx} className="list-item">
//                     <i className="fas fa-paperclip"></i> {file.name}
//                   </div>
//                 ))
//               ) : (
//                 <div className="empty">No files attached</div>
//               )}
//             </div>
//           </div>

//           <div className="confirmation-text">
//             Are you sure you want to proceed?
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="modal-actions">
//           <button
//             className="btn btn-primary"
//             onClick={() => {
//               if (onNext) onNext();
//             }}
//           >
//             Next <i className="fas fa-arrow-right"></i>
//           </button>

//           <button className="btn btn-secondary" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SummaryModal;













import React from "react";
import "../styles/SummaryModal.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SummaryModal = ({
  isOpen,
  onClose,
  vehicleType,
  manualOrders,
  uploadedFiles,
  onNext,
  loading,
  userType = "mechanic"
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            <i className="fas fa-list-check"></i> Order Summary
            {userType === "mechanic" && <span className="mechanic-badge">Mechanic Order</span>}
          </h2>

          <button className="close-btn" onClick={onClose} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <hr className="divider" />

        {/* Summary Content */}
        <div className="modal-body">
          {/* Vehicle Type */}
          <div className="info-item">
            <span className="info-label">Vehicle Type:</span>
            <span className="info-value">{vehicleType || "None selected"}</span>
          </div>

          {/* Orders */}
          <div className="info-item">
            <span className="info-label">Parts Requested:</span>
            <div className="info-list">
              {manualOrders && manualOrders.length > 0 ? (
                manualOrders.map((order, idx) => (
                  <div key={idx} className="list-item">
                    <i className="fas fa-cog"></i> {order}
                  </div>
                ))
              ) : (
                <div className="empty">No parts added</div>
              )}
            </div>
          </div>

          {/* Attachments */}
          <div className="info-item">
            <span className="info-label">Reference Files:</span>
            <div className="info-list">
              {uploadedFiles && uploadedFiles.length > 0 ? (
                Array.from(uploadedFiles).map((file, idx) => (
                  <div key={idx} className="list-item">
                    <i className="fas fa-paperclip"></i> {file.name}
                    <span className="file-size">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ))
              ) : (
                <div className="empty">No files attached</div>
              )}
            </div>
          </div>

          {/* Mechanic-specific info */}
          {userType === "mechanic" && (
            <div className="mechanic-info-note">
              <i className="fas fa-info-circle"></i>
              <span>This order will be processed by our admin team. You'll receive a quote within 24 hours.</span>
            </div>
          )}

          <div className="confirmation-text">
            Ready to submit this parts request?
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button
            className="btn btn-primary"
            onClick={onNext}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Submitting...
              </>
            ) : (
              <>
                Submit Order <i className="fas fa-paper-plane"></i>
              </>
            )}
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;