// import React, { useState } from "react";
// import "../styles/PreviewModal.css";

// const PreviewModal = ({ isOpen, onClose, order, onConfirm, formatFaultName }) => {
//   const [servicePrices, setServicePrices] = useState({});
//   const [notes, setNotes] = useState("");
//   const [estimatedHours, setEstimatedHours] = useState(3);

//   if (!isOpen) return null;

//   const handlePriceChange = (index, value) => {
//     setServicePrices((prev) => ({
//       ...prev,
//       [index]: Number(value) || 0,
//     }));
//   };

//   // Use the actual carFaults that the car owner selected
//   const services = order.carFaults || [];
//   const serviceTotals = services.map((service, index) => servicePrices[index] || 0);
//   const grandTotal = serviceTotals.reduce((acc, curr) => acc + curr, 0);
//   const canConfirm = services.every((_, index) => servicePrices[index] > 0);

//   return (
//     <div className="previewmodal-overlay">
//       <div className="previewmodal-container">
//         <button onClick={onClose} className="previewmodal-close-btn" aria-label="Close">
//           ✕
//         </button>

//         <h2 className="previewmodal-title">Submit Quote to {order.clientFullName}</h2>
//         <p className="previewmodal-subtitle">
//           Set prices for the services requested by the customer.
//         </p>

//         {/* Vehicle Info */}
//         <div className="vehicle-info-card">
//           <h4>{order.carMake} {order.carModel} ({order.carYear})</h4>
//           <p><strong>Customer Issue:</strong> {order.complaintRequestDetails}</p>
//         </div>

//         {/* Services Table - Using the actual carFaults that car owner selected */}
//         <div className="previewmodal-table-wrapper">
//           <table className="previewmodal-table">
//             <thead>
//               <tr>
//                 <th>Service Requested</th>
//                 <th>Service Price (₦)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {services.map((service, index) => (
//                 <tr key={index}>
//                   <td>
//                     <strong>{formatFaultName(service)}</strong>
//                     <br />
//                     <small>Professional repair service</small>
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       placeholder="0.00"
//                       className="previewmodal-input"
//                       value={servicePrices[index] || ""}
//                       onChange={(e) => handlePriceChange(index, e.target.value)}
//                       min="0"
//                       step="100"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Additional Quote Details */}
//         <div className="quote-details">
//           <div className="form-group">
//             <label>Estimated Repair Time (hours):</label>
//             <input
//               type="number"
//               value={estimatedHours}
//               onChange={(e) => setEstimatedHours(Number(e.target.value))}
//               min="1"
//               max="24"
//               className="hours-input"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Service Notes for Customer:</label>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Explain what the service includes, warranty information, or any special notes..."
//               className="notes-textarea"
//               rows="3"
//             />
//           </div>
//         </div>

//         {/* Grand Total */}
//         <div className="previewmodal-grandtotal">
//           <div className="total-line">Total Quote Amount: <span>₦{grandTotal.toLocaleString()}</span></div>
//         </div>

//         {/* Buttons */}
//         <div className="previewmodal-actions">
//           <button onClick={onClose} className="previewmodal-btn cancel">
//             Cancel Quote
//           </button>
//           <button
//             onClick={() => onConfirm(grandTotal, servicePrices, notes, estimatedHours)}
//             disabled={!canConfirm}
//             className={`previewmodal-btn confirm ${!canConfirm ? "disabled" : ""}`}
//           >
//             ✅ Send Quote to Customer
//           </button>
//         </div>

//         <div className="help-text">
//           <small>💡 The customer will receive this quote and can accept or decline it.</small>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewModal;












import React, { useState, useEffect } from "react";
import "../styles/PreviewModal.css";

const PreviewModal = ({ isOpen, onClose, order, onConfirm, formatFaultName }) => {
  const [servicePrices, setServicePrices] = useState({});
  const [notes, setNotes] = useState("");
  const [estimatedHours, setEstimatedHours] = useState(3);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      // Initialize with empty prices
      const initialPrices = {};
      if (order.carFaults) {
        order.carFaults.forEach((_, index) => {
          initialPrices[index] = 0;
        });
      }
      setServicePrices(initialPrices);
      setNotes("");
      setEstimatedHours(3);
      setFormErrors({});
      setSubmitting(false);
    }
  }, [isOpen, order.carFaults]);

  if (!isOpen) return null;

  const handlePriceChange = (index, value) => {
    const price = Number(value) || 0;
    
    setServicePrices((prev) => ({
      ...prev,
      [index]: price,
    }));

    // Clear error when user starts typing
    if (formErrors[index]) {
      setFormErrors(prev => ({
        ...prev,
        [index]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const services = order.carFaults || [];

    // Check if all services have valid prices
    services.forEach((service, index) => {
      const price = servicePrices[index];
      console.log(`Service ${index} price:`, price); // Debug log
      
      if (price === undefined || price === null) {
        errors[index] = 'Please enter a price';
      } else if (price <= 0) {
        errors[index] = 'Price must be greater than 0';
      } else if (price < 100) {
        // Warning but not blocking - remove this if you want to allow any price
        // errors[index] = 'Price seems too low';
      }
    });

    // Check estimated hours
    if (!estimatedHours || estimatedHours < 1) {
      errors.estimatedHours = 'Estimated hours must be at least 1';
    } else if (estimatedHours > 24) {
      errors.estimatedHours = 'Estimated hours cannot exceed 24';
    }

    console.log('Form errors:', errors); // Debug log
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    console.log('Submitting form...'); // Debug log
    console.log('Service prices:', servicePrices); // Debug log
    console.log('Estimated hours:', estimatedHours); // Debug log
    
    if (!validateForm()) {
      console.log('Validation failed'); // Debug log
      alert('Please fix the errors before submitting. Make sure all services have prices and estimated hours are valid.');
      return;
    }

    try {
      setSubmitting(true);
      
      const services = order.carFaults || [];
      const serviceTotals = services.map((service, index) => servicePrices[index] || 0);
      const grandTotal = serviceTotals.reduce((acc, curr) => acc + curr, 0);

      console.log('Calling onConfirm with:', { grandTotal, servicePrices, notes, estimatedHours }); // Debug log
      
      await onConfirm(grandTotal, servicePrices, notes, estimatedHours);
      
    } catch (error) {
      console.error('Error in preview modal:', error);
      alert('Failed to submit quote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Use the actual carFaults that the car owner selected
  const services = order.carFaults || [];
  const serviceTotals = services.map((service, index) => servicePrices[index] || 0);
  const grandTotal = serviceTotals.reduce((acc, curr) => acc + curr, 0);
  
  // Check if all services have valid prices
  const canSubmit = services.length > 0 && 
                   services.every((_, index) => {
                     const price = servicePrices[index];
                     return price !== undefined && price !== null && price > 0;
                   }) &&
                   estimatedHours >= 1 && 
                   estimatedHours <= 24;

  console.log('Can submit:', canSubmit); // Debug log
  console.log('Services count:', services.length); // Debug log

  return (
    <div className="previewmodal-overlay">
      <div className="previewmodal-container">
        <button 
          onClick={onClose} 
          className="previewmodal-close-btn" 
          aria-label="Close"
          disabled={submitting}
        >
          ✕
        </button>

        <h2 className="previewmodal-title">Submit Quote to {order.clientFullName}</h2>
        <p className="previewmodal-subtitle">
          Set prices for the services requested by the customer. This quote will be sent for their review.
        </p>

        {/* Vehicle Info */}
        <div className="vehicle-info-card">
          <h4>{order.carMake} {order.carModel} ({order.carYear})</h4>
          <p><strong>Customer Issue:</strong> {order.complaintRequestDetails}</p>
        </div>

        {/* Services Table - Using the actual carFaults that car owner selected */}
        <div className="previewmodal-table-wrapper">
          <table className="previewmodal-table">
            <thead>
              <tr>
                <th>Service Requested</th>
                <th>Service Price (₦)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service, index) => {
                  const price = servicePrices[index] || 0;
                  return (
                    <tr key={index}>
                      <td>
                        <strong>{formatFaultName(service)}</strong>
                        <br />
                        <small>Professional repair service</small>
                        {formErrors[index] && (
                          <div className="price-error">{formErrors[index]}</div>
                        )}
                      </td>
                      <td>
                        <div className="price-input-container">
                          <span className="currency-symbol">₦</span>
                          <input
                            type="number"
                            placeholder="0.00"
                            className={`previewmodal-input ${formErrors[index] ? 'error' : ''}`}
                            value={price === 0 ? '' : price}
                            onChange={(e) => handlePriceChange(index, e.target.value)}
                            min="0"
                            step="100"
                            disabled={submitting}
                          />
                        </div>
                      </td>
                      <td className="service-total">
                        ₦{price.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="no-services">
                    No services requested. Please add services to create a quote.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Additional Quote Details */}
        <div className="quote-details">
          <div className="form-group">
            <label>Estimated Repair Time (hours):</label>
            <input
              type="number"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(Number(e.target.value))}
              min="1"
              max="24"
              className={`hours-input ${formErrors.estimatedHours ? 'error' : ''}`}
              disabled={submitting}
            />
            {formErrors.estimatedHours && (
              <div className="price-error">{formErrors.estimatedHours}</div>
            )}
          </div>
          
          <div className="form-group">
            <label>Service Notes for Customer (Optional):</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Explain what the service includes, warranty information, parts used, or any special notes for the customer..."
              className="notes-textarea"
              rows="3"
              disabled={submitting}
            />
          </div>
        </div>

        {/* Grand Total */}
        {services.length > 0 && (
          <div className="previewmodal-grandtotal">
            <div className="total-line">
              Total Quote Amount: 
              <span className="total-amount">₦{grandTotal.toLocaleString()}</span>
            </div>
            <div className="estimated-time">
              Estimated Time: {estimatedHours} hour{estimatedHours !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="previewmodal-actions">
          <button 
            onClick={onClose} 
            className="previewmodal-btn cancel"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className={`previewmodal-btn confirm ${(!canSubmit || submitting) ? "disabled" : ""}`}
          >
            {submitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Send Quote to Customer
              </>
            )}
          </button>
        </div>

        {!canSubmit && services.length > 0 && (
          <div className="validation-help">
            <small>
              ⚠️ Please enter valid prices for all services and estimated hours to submit the quote.
            </small>
          </div>
        )}

        <div className="help-text">
          <small>
            💡 The customer will receive this quote and can accept or decline it. 
            You'll be notified when they respond.
          </small>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;