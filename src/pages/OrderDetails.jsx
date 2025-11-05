import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PreviewModal from "../components/PreviewModal";
import SuccessModal from "../components/SuccessModal";
import DeleteModal from "../components/DeleteModal";
import "../styles/OrderDetails.css";
import { mechanicAPI } from "../services/mechanicAPI";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Helper function to format fault names
  const formatFaultName = (fault) => {
    const faultNames = {
      'engine_fault': 'Engine Repair',
      'brake_system': 'Brake System Service', 
      'engine_knocking': 'Engine Knocking Repair',
      'brake_vibration': 'Brake Vibration Fix',
      'suspension_noise': 'Suspension Repair',
      'electrical_issue': 'Electrical System Repair',
      'transmission_problem': 'Transmission Service',
      'ac_not_cooling': 'AC System Repair',
      'overheating': 'Overheating Issue Repair',
      'starting_issue': 'Starting System Repair',
      'warning_lights': 'Warning Lights Diagnosis',
      'oil_leak': 'Oil Leak Repair'
    };
    
    return faultNames[fault] || fault.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await mechanicAPI.getOrderDetails(orderId);
      
      if (response.success && response.data) {
        setOrder(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Failed to load order details. Please try again.');
      
      // Fallback mock data for development
      setOrder({
        id: orderId,
        orderId: orderId,
        clientFullName: "Michael Johnson",
        clientProfilePictureUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
        carMake: "Toyota",
        carModel: "Camry", 
        carYear: "2018",
        phoneNumber: "+1 234 567 890",
        email: "michael.johnson@example.com",
        locationAddress: "15 Lekki Phase 1, Lagos, Nigeria",
        carFaults: ['brake_system', 'engine_fault', 'electrical_issue'],
        complaintRequestDetails: "Car makes a squealing noise during braking and shows reduced braking performance. Engine light is also on.",
        existingQuote: null
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewConfirm = async (grandTotal, servicePrices, notes, estimatedHours) => {
    try {
      if (!order || !order.carFaults) {
        alert('No services found to quote');
        return;
      }

      // Convert car faults to breakdown format
      const breakdown = order.carFaults.map((fault, index) => ({
        item: formatFaultName(fault),
        cost: servicePrices[index] || 0,
        description: `Professional repair for ${formatFaultName(fault).toLowerCase()}`,
        quantity: 1
      }));

      const quoteData = {
        amount: grandTotal,
        breakdown: breakdown,
        estimatedHours: estimatedHours || 3,
        notes: notes || `Professional service for ${order.carMake} ${order.carModel}. Quality work guaranteed.`
      };
      
      await mechanicAPI.submitQuote(orderId, quoteData);
      
      setIsPreviewOpen(false);
      setIsSuccessOpen(true);
      fetchOrderDetails(); // Refresh to show the new quote
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Failed to submit quote. Please try again.');
    }
  };

  const handleRejectOrder = async (reason) => {
    try {
      await mechanicAPI.rejectOrder(orderId, reason);
      setIsDeleteOpen(false);
      navigate("/new-orders");
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Failed to reject order. Please try again.');
    }
  };

  // const handleAcceptOrder = async () => {
  //   try {
  //     await mechanicAPI.acceptOrder(orderId);
      
  //     // Open the quote modal after accepting
  //     setIsPreviewOpen(true);
  //     fetchOrderDetails();
  //   } catch (error) {
  //     console.error('Error accepting order:', error);
  //     alert('Failed to accept order. Please try again.');
  //   }
  // };


  // In OrderDetails.js - Update the handleAcceptOrder function
const handleAcceptOrder = async () => {
  try {
    console.log('✅ [FRONTEND] Opening quote modal for order:', orderId);
    
    // Just open the quote modal - don't accept the order yet
    // The order should remain "pending" until quote is submitted
    setIsPreviewOpen(true);
    
    // Only call acceptOrder if you want to immediately accept
    // await mechanicAPI.acceptOrder(orderId);
    // fetchOrderDetails();
    
  } catch (error) {
    console.error('❌ Error opening quote modal:', error);
    alert('Failed to open quote form. Please try again.');
  }
};

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main orderdetails-container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            Loading order details...
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main orderdetails-container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Order Not Found</h3>
            <p>We couldn't find the order details for #{orderId}.</p>
            <button className="primary-btn" onClick={() => navigate("/new-orders")}>
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main orderdetails-container">
        {/* Header */}
        <div className="orderdetails-header">
          <button
            onClick={() => navigate("/new-orders")}
            className="orderdetails-back-btn"
            aria-label="Go back"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="orderdetails-title">{order.clientFullName} Order</h1>
          <span className="order-id-badge">#{order.orderId}</span>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {/* Profile Section */}
        <div className="orderdetails-profile">
          <div className="orderdetails-profile-left">
            <div className="orderdetails-img-wrapper">
              <img
                src={order.clientProfilePictureUrl}
                alt={order.clientFullName}
                className="orderdetails-profile-img"
              />
            </div>
            <div className="orderdetails-name-block">
              <h2 className="orderdetails-client-name">{order.clientFullName}</h2>
              <p className="orderdetails-client-subtext">{order.email}</p>
            </div>
          </div>

          <div className="orderdetails-info">
            <p><strong>Car:</strong> {order.carMake} {order.carModel}</p>
            <p><strong>Year:</strong> {order.carYear}</p>
            <p><strong>Phone:</strong> {order.phoneNumber}</p>
            <p><strong>Address:</strong> {order.locationAddress}</p>
          </div>
        </div>

        {/* Existing Quote Notice */}
        {order.existingQuote && (
          <div className="existing-quote-notice">
            <i className="fas fa-file-invoice-dollar"></i>
            <div>
              <strong>Quote Already Submitted</strong>
              <p>Amount: ₦{order.existingQuote.amount?.toLocaleString()}</p>
              <p>Status: {order.existingQuote.status}</p>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="orderdetails-location">
          <p>{order.locationAddress}</p>
          <button
            className="orderdetails-direction-btn"
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${encodeURIComponent(order.locationAddress)}`,
                "_blank"
              )
            }
          >
            <i className="fas fa-map-marker-alt"></i> See Direction
          </button>
        </div>

        {/* Services Requested Section - This shows what the car owner selected */}
        <div className="orderdetails-card sleek-card">
          <div className="sleek-card-header">
            <h2>Services Requested</h2>
            <i className="fas fa-tools icon"></i>
          </div>
          
          <div className="car-faults-list">
            {order.carFaults && order.carFaults.length > 0 ? (
              <div className="faults-container">
                {order.carFaults.map((fault, index) => (
                  <div key={index} className="fault-item">
                    <i className="fas fa-wrench fault-icon"></i>
                    <span className="fault-name">{formatFaultName(fault)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-faults-message">
                <i className="fas fa-info-circle"></i>
                <p>No specific services requested</p>
                {order.complaintRequestDetails && (
                  <p className="complaint-fallback">Based on complaint: {order.complaintRequestDetails}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Customer Complaint Section */}
        <div className="orderdetails-card">
          <h2>Customer Complaint Details</h2>
          <p className="complaint-text">{order.complaintRequestDetails}</p>
        </div>

        {/* Action Buttons */}
        <div className="orderdetails-actions">
          <button 
            className="orderdetails-btn orderdetails-btn-reject" 
            onClick={() => setIsDeleteOpen(true)}
          >
            Reject
          </button>

          <button
            onClick={handleAcceptOrder}
            className="orderdetails-btn orderdetails-btn-accept"
            disabled={order.existingQuote}
          >
            {order.existingQuote ? 'Quote Submitted' : 'Accept & Quote'}
          </button>
        </div>

        {/* Modals */}
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          order={order}
          onConfirm={handlePreviewConfirm}
          formatFaultName={formatFaultName}
        />

        <SuccessModal
          isOpen={isSuccessOpen}
          onClose={() => {
            setIsSuccessOpen(false);
            navigate("/new-orders");
          }}
          navigateToOrders={() => navigate("/new-orders")}
        />

        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleRejectOrder}
        />
      </div>
    </div>
  );
}