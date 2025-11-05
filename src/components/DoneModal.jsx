// import React from "react";
// import "../styles/DoneModal.css";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome icons

// const DoneModal = ({ isOpen, onClose, navigateToDashboard, trackOrder }) => {
//   if (!isOpen) return null;

//   const steps = ["Order", "Summary", "Done"];

//   return (
//     <div className="done-overlay">
//       <div className="done-modal">
//         {/* Close button */}
//         <button onClick={onClose} className="done-close-btn" aria-label="Close">
//           <i className="fas fa-times"></i>
//         </button>

//         {/* Progress Bar */}
//         <div className="done-progress">
//           {steps.map((step, idx) => (
//             <div key={step} className="done-step">
//               <span
//                 className={`done-step-circle ${
//                   idx === 2 ? "active" : ""
//                 }`}
//               >
//                 {idx + 1}
//               </span>
//               <span
//                 className={`done-step-label ${
//                   idx === 2 ? "active" : ""
//                 }`}
//               >
//                 {step}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Done Content */}
//         <div className="done-content">
//           <div className="done-check">
//             <span>✓</span>
//           </div>

//           <div className="done-text-title">
//             Your Procurement order has been taken
//           </div>

//           <div className="done-info-box">
//             <i className="fas fa-info-circle"></i>
//             <span>
//               Your order is being processed, we'll get back to you shortly!
//             </span>
//           </div>

//           {/* Action Buttons */}
//           <div className="done-buttons">
//             <button className="btn-primary" onClick={navigateToDashboard}>
//               Go back to Dashboard
//             </button>
//             <button className="btn-outline" onClick={trackOrder}>
//               Track Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoneModal;
































import React from "react";
import "../styles/DoneModal.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const DoneModal = ({ 
  isOpen, 
  onClose, 
  navigateToDashboard, 
  trackOrder, 
  userType = "mechanic" 
}) => {
  if (!isOpen) return null;

  const steps = ["Order", "Summary", "Done"];

  return (
    <div className="done-overlay">
      <div className="done-modal">
        {/* Close button */}
        <button onClick={onClose} className="done-close-btn" aria-label="Close">
          <i className="fas fa-times"></i>
        </button>

        {/* Progress Bar */}
        <div className="done-progress">
          {steps.map((step, idx) => (
            <div key={step} className="done-step">
              <span
                className={`done-step-circle ${
                  idx === 2 ? "active" : ""
                }`}
              >
                {idx + 1}
              </span>
              <span
                className={`done-step-label ${
                  idx === 2 ? "active" : ""
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Done Content */}
        <div className="done-content">
          <div className="done-check">
            <span>✓</span>
          </div>

          <div className="done-text-title">
            {userType === "mechanic" 
              ? "Your Workshop Parts Order Has Been Submitted" 
              : "Your Procurement order has been taken"
            }
          </div>

          <div className="done-info-box">
            <i className="fas fa-info-circle"></i>
            <span>
              {userType === "mechanic" 
                ? "Your mechanic parts order is being processed. Our admin team will review it and provide a quote within 24 hours."
                : "Your order is being processed, we'll get back to you shortly!"
              }
            </span>
          </div>

          {/* Next Steps for Mechanics */}
          {userType === "mechanic" && (
            <div className="next-steps">
              <h4>What happens next?</h4>
              <ul>
                <li><i className="fas fa-check"></i> Admin reviews your parts request</li>
                <li><i className="fas fa-check"></i> Price quote prepared based on availability</li>
                <li><i className="fas fa-check"></i> You'll receive notification to approve quote</li>
                <li><i className="fas fa-check"></i> Parts ordered and delivered to your workshop</li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="done-buttons">
            <button className="btn-primary" onClick={navigateToDashboard}>
              Back to Dashboard
            </button>
            <button className="btn-outline" onClick={trackOrder}>
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneModal;