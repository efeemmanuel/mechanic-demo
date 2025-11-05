// import React, { useState } from "react";
// import SummaryModal from "../components/SummaryModal";
// import DoneModal from "../components/DoneModal";
// import { useNavigate } from "react-router-dom";
// import "../styles/ProcurePage.css";

// const ProcurePage = () => {
//   const navigate = useNavigate();

//   // State
//   const [vehicleType, setVehicleType] = useState("");
//   const [manualOrders, setManualOrders] = useState([]);
//   const [currentOrder, setCurrentOrder] = useState("");
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDoneOpen, setIsDoneOpen] = useState(false);

//   // Validation error state
//   const [error, setError] = useState("");

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setUploadedFiles([...e.target.files]);
//   };

//   // Handle Next button
//   const handleNext = () => {
//     if (!vehicleType) {
//       setError("Please select a vehicle type.");
//       return;
//     }
//     if (manualOrders.length === 0) {
//       setError("Please add at least one manual order.");
//       return;
//     }
//     setError(""); // Clear error if validation passes
//     setIsModalOpen(true);
//   };

//   // Remove order tag
//   const removeOrder = (idx) => {
//     setManualOrders(manualOrders.filter((_, i) => i !== idx));
//   };

//   // Add order
//   const addOrder = () => {
//     if (currentOrder.trim()) {
//       setManualOrders([...manualOrders, currentOrder.trim()]);
//       setCurrentOrder("");
//     }
//   };

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//       />

//       <div className="procure-page-container">
//         <div className="procure-page-wrapper">
//           {/* Header */}
//           <div className="procure-header">
//             <div className="procure-header-left">
//               <button
//                 onClick={() => navigate("/find-mechanic")}
//                 className="procure-back-btn"
//               >
//                 <i className="fas fa-arrow-left"></i>
//               </button>
//               <h1 className="procure-title">Procure Auto Parts</h1>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="procure-progress-bar">
//             {["Order", "Summary", "Done"].map((step, idx) => (
//               <div
//                 key={step}
//                 className={`procure-progress-step ${
//                   idx === 0 ? "procure-progress-step-active" : ""
//                 }`}
//               >
//                 <span className="procure-progress-circle">{idx + 1}</span>
//                 <span className="procure-progress-label">{step}</span>
//               </div>
//             ))}
//           </div>

//           {/* Vehicle Type Selection */}
//           <div className="procure-card">
//             <h2 className="procure-card-title">
//               Select your Vehicle Type <span className="procure-required">*</span>
//             </h2>
//             <div className="procure-vehicle-grid">
//               {["Car", "Motorcycle", "Buses", "Trucks", "Vans", "Others"].map(
//                 (type) => (
//                   <button
//                     key={type}
//                     className={`procure-vehicle-btn ${
//                       vehicleType === type ? "procure-vehicle-btn-active" : ""
//                     }`}
//                     onClick={() => setVehicleType(type)}
//                   >
//                     {type}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Manual Order */}
//           <div className="procure-card">
//             <h2 className="procure-card-title">
//               Type in your order manually{" "}
//               <span className="procure-required">*</span>
//             </h2>
//             <div className="procure-order-input-wrapper">
//               <input
//                 type="text"
//                 placeholder="E.G Brake Pad"
//                 value={currentOrder}
//                 onChange={(e) => setCurrentOrder(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && addOrder()}
//                 className="procure-order-input"
//               />
//               <button onClick={addOrder} className="procure-add-btn">
//                 Add
//               </button>
//             </div>

//             <div className="procure-tags-wrapper">
//               {manualOrders.map((tag, idx) => (
//                 <span
//                   key={idx}
//                   className="procure-tag"
//                   onClick={() => removeOrder(idx)}
//                 >
//                   {tag} <i className="fas fa-times procure-tag-icon"></i>
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* File Upload (Optional) */}
//           <div className="procure-card">
//             <h2 className="procure-card-title">Upload File (Optional)</h2>
//             <div className="procure-upload-wrapper">
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="procure-file-input"
//                 id="fileUpload"
//               />
//               <label htmlFor="fileUpload" className="procure-upload-label">
//                 <i className="fas fa-cloud-upload-alt procure-upload-icon"></i>
//                 <p className="procure-upload-text">
//                   Click to upload or drag and drop
//                 </p>
//                 <p className="procure-upload-subtext">
//                   PDF, PNG, JPG (max 10MB)
//                 </p>
//               </label>
//             </div>

//             {uploadedFiles.length > 0 && (
//               <div className="procure-files-list">
//                 {uploadedFiles.map((file, idx) => (
//                   <div key={idx} className="procure-file-item">
//                     <i className="fas fa-file procure-file-icon"></i>
//                     <span className="procure-file-name">{file.name}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Error Message */}
//           {error && <p className="procure-error-message">{error}</p>}

//           {/* Next Button */}
//           <div className="procure-next-wrapper">
//             <button className="procure-next-btn" onClick={handleNext}>
//               Next
//             </button>
//           </div>

//           {/* Summary Modal */}
//           <SummaryModal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             vehicleType={vehicleType}
//             manualOrders={manualOrders}
//             uploadedFiles={uploadedFiles}
//             onNext={() => {
//               setIsModalOpen(false);
//               setIsDoneOpen(true);
//             }}
//           />

//           {/* Done Modal */}
//           <DoneModal
//             isOpen={isDoneOpen}
//             onClose={() => setIsDoneOpen(false)}
//             navigateToDashboard={() => navigate("/dashboard")}
//             trackOrder={() => navigate("/track-order")}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProcurePage;














import React, { useState } from "react";
import SummaryModal from "../components/SummaryModal";
import DoneModal from "../components/DoneModal";
import { useNavigate } from "react-router-dom";
import { mechanicPartsAPI } from "../services/mechanicPartsAPI";
import "../styles/ProcurePage.css";

const ProcurePage = () => {
  const navigate = useNavigate();

  // State
  const [vehicleType, setVehicleType] = useState("");
  const [manualOrders, setManualOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneOpen, setIsDoneOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Validation error state
  const [error, setError] = useState("");

  // Vehicle type mapping for backend
  const vehicleTypeMap = {
    'Car': 'car',
    'Motorcycle': 'bike',
    'Buses': 'bus',
    'Trucks': 'truck',
    'Vans': 'car', // Map vans to car
    'Others': 'car' // Map others to car
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setUploadedFiles([...e.target.files]);
  };

  // Handle Next button
  const handleNext = () => {
    if (!vehicleType) {
      setError("Please select a vehicle type.");
      return;
    }
    if (manualOrders.length === 0) {
      setError("Please add at least one manual order.");
      return;
    }
    setError(""); // Clear error if validation passes
    setIsModalOpen(true);
  };

  // Remove order tag
  const removeOrder = (idx) => {
    setManualOrders(manualOrders.filter((_, i) => i !== idx));
  };

  // Add order
  const addOrder = () => {
    if (currentOrder.trim()) {
      setManualOrders([...manualOrders, currentOrder.trim()]);
      setCurrentOrder("");
    }
  };

  // Submit order to backend
  const submitOrder = async () => {
    try {
      setSubmitting(true);
      
      // Prepare order data for backend
      const orderData = {
        vehicleInfo: {
          vehicleType: vehicleTypeMap[vehicleType] || 'car'
        },
        items: manualOrders.map(order => ({
          name: order,
          quantity: 1,
          urgency: 'medium',
          description: `Auto part: ${order}`,
          specifications: {
            quality: 'aftermarket',
            warrantyRequired: false
          }
        })),
        deliveryInfo: {
          deliveryOption: 'delivery'
        },
        paymentInfo: {
          paymentMethod: 'transfer'
        },
        priority: 'normal'
      };

      console.log('Submitting mechanic order data:', orderData);

      const response = await mechanicPartsAPI.createOrder(orderData);
      
      if (response.success) {
        console.log('Mechanic order created successfully:', response.data);
        setIsModalOpen(false);
        setIsDoneOpen(true);
      }
    } catch (err) {
      console.error('Mechanic order submission error:', err);
      setError(err.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="procure-page-container">
        <div className="procure-page-wrapper">
          {/* Header */}
          <div className="procure-header">
            <div className="procure-header-left">
              <button
                onClick={() => navigate("/dashboard")}
                className="procure-back-btn"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <h1 className="procure-title">Procure Auto Parts</h1>
              <span className="mechanic-badge">Mechanic Order</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="procure-progress-bar">
            {["Order", "Summary", "Done"].map((step, idx) => (
              <div
                key={step}
                className={`procure-progress-step ${
                  idx === 0 ? "procure-progress-step-active" : ""
                }`}
              >
                <span className="procure-progress-circle">{idx + 1}</span>
                <span className="procure-progress-label">{step}</span>
              </div>
            ))}
          </div>

          {/* Vehicle Type Selection */}
          <div className="procure-card">
            <h2 className="procure-card-title">
              Select Vehicle Type <span className="procure-required">*</span>
            </h2>
            <p className="procure-subtitle">For which vehicle are you ordering parts?</p>
            <div className="procure-vehicle-grid">
              {["Car", "Motorcycle", "Buses", "Trucks", "Vans", "Others"].map(
                (type) => (
                  <button
                    key={type}
                    className={`procure-vehicle-btn ${
                      vehicleType === type ? "procure-vehicle-btn-active" : ""
                    }`}
                    onClick={() => setVehicleType(type)}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Manual Order */}
          <div className="procure-card">
            <h2 className="procure-card-title">
              Parts Needed <span className="procure-required">*</span>
            </h2>
            <p className="procure-subtitle">List the auto parts you need for your workshop</p>
            <div className="procure-order-input-wrapper">
              <input
                type="text"
                placeholder="E.G Brake Pads, Spark Plugs, Oil Filter..."
                value={currentOrder}
                onChange={(e) => setCurrentOrder(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addOrder()}
                className="procure-order-input"
              />
              <button onClick={addOrder} className="procure-add-btn">
                <i className="fas fa-plus"></i> Add
              </button>
            </div>

            <div className="procure-tags-wrapper">
              {manualOrders.map((tag, idx) => (
                <span
                  key={idx}
                  className="procure-tag"
                  onClick={() => removeOrder(idx)}
                >
                  {tag} <i className="fas fa-times procure-tag-icon"></i>
                </span>
              ))}
            </div>
          </div>

          {/* File Upload (Optional) */}
          <div className="procure-card">
            <h2 className="procure-card-title">Upload Reference Files (Optional)</h2>
            <p className="procure-subtitle">Photos, diagrams, or part specifications</p>
            <div className="procure-upload-wrapper">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="procure-file-input"
                id="fileUpload"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              />
              <label htmlFor="fileUpload" className="procure-upload-label">
                <i className="fas fa-cloud-upload-alt procure-upload-icon"></i>
                <p className="procure-upload-text">
                  Click to upload or drag and drop
                </p>
                <p className="procure-upload-subtext">
                  PDF, PNG, JPG, DOC (max 10MB each)
                </p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="procure-files-list">
                <h4>Uploaded Files ({uploadedFiles.length})</h4>
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="procure-file-item">
                    <i className="fas fa-file procure-file-icon"></i>
                    <span className="procure-file-name">{file.name}</span>
                    <span className="procure-file-size">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="procure-error-message">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          {/* Next Button */}
          <div className="procure-next-wrapper">
            <button 
              className="procure-next-btn" 
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Review Order'}
            </button>
          </div>

          {/* Summary Modal */}
          <SummaryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            vehicleType={vehicleType}
            manualOrders={manualOrders}
            uploadedFiles={uploadedFiles}
            onNext={submitOrder}
            loading={submitting}
            userType="mechanic"
          />

          {/* Done Modal */}
          <DoneModal
            isOpen={isDoneOpen}
            onClose={() => setIsDoneOpen(false)}
            navigateToDashboard={() => navigate("/dashboard")}
            trackOrder={() => navigate("/mechanic/track-orders")}
            userType="mechanic"
          />
        </div>
      </div>
    </>
  );
};

export default ProcurePage;