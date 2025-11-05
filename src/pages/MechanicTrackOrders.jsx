import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mechanicPartsAPI } from "../services/mechanicPartsAPI";
import "../styles/MechanicTrackOrders.css";

const MechanicTrackOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all'
  });

  useEffect(() => {
    fetchMechanicOrders();
  }, [filters]);

  const fetchMechanicOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await mechanicPartsAPI.getMyOrders(filters);
      
      if (response.success) {
        const ordersData = response.data.orders || [];
        setOrders(ordersData);
      } else {
        setError(response.message || 'Failed to fetch orders');
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching mechanic orders:', error);
      setError('Failed to load orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    const statusInfo = {
      'draft': {
        color: '#6c757d',
        label: 'Draft',
        icon: 'fas fa-edit',
        description: 'Order being prepared'
      },
      'submitted': {
        color: '#ffc107',
        label: 'Submitted',
        icon: 'fas fa-paper-plane',
        description: 'Waiting for admin review'
      },
      'under_review': {
        color: '#17a2b8',
        label: 'Under Review',
        icon: 'fas fa-search',
        description: 'Admin reviewing parts'
      },
      'quoted': {
        color: '#007bff',
        label: 'Quote Provided',
        icon: 'fas fa-file-invoice-dollar',
        description: 'Price quote available'
      },
      'approved': {
        color: '#28a745',
        label: 'Approved',
        icon: 'fas fa-check-circle',
        description: 'Quote approved'
      },
      'ordered': {
        color: '#6610f2',
        label: 'Parts Ordered',
        icon: 'fas fa-shopping-cart',
        description: 'Parts ordered from supplier'
      },
      'shipped': {
        color: '#fd7e14',
        label: 'Shipped',
        icon: 'fas fa-shipping-fast',
        description: 'Parts are on the way'
      },
      'received': {
        color: '#20c997',
        label: 'Received',
        icon: 'fas fa-box-open',
        description: 'Parts received at workshop'
      },
      'completed': {
        color: '#6c757d',
        label: 'Completed',
        icon: 'fas fa-flag-checkered',
        description: 'Order completed'
      },
      'cancelled': {
        color: '#dc3545',
        label: 'Cancelled',
        icon: 'fas fa-times-circle',
        description: 'Order cancelled'
      }
    };
    return statusInfo[status] || statusInfo['draft'];
  };

  const viewOrderDetails = (order) => {
    navigate(`/mechanic/auto-parts/${order.orderId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const refreshOrders = () => {
    fetchMechanicOrders();
  };

  if (loading) {
    return (
      <div className="mechanic-track-orders-container">
        <div className="track-orders-header">
          <button onClick={() => navigate("/dashboard")} className="back-btn">
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1>My Parts Orders</h1>
          <p>Track your workshop parts requests</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your workshop orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mechanic-track-orders-container">
      <div className="track-orders-header">
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </button>
        <div className="header-content">
          <h1>My Parts Orders</h1>
          <p>Track your workshop parts requests and quotes</p>
        </div>
        <button onClick={refreshOrders} className="refresh-btn">
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
          <button onClick={refreshOrders} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="orders-filters">
        <select 
          value={filters.status} 
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="quoted">Quoted</option>
          <option value="approved">Approved</option>
          <option value="ordered">Ordered</option>
          <option value="completed">Completed</option>
        </select>

        <select 
          value={filters.priority} 
          onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>

        <button onClick={() => navigate('/procure-auto-parts')} className="new-order-btn">
          <i className="fas fa-plus"></i> New Parts Order
        </button>
      </div>

      {orders.length > 0 ? (
        <div className="mechanic-orders-list">
          {orders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            
            return (
              <div key={order._id || order.orderId} className="mechanic-order-card">
                <div className="order-card-header">
                  <div className="order-info">
                    <h3>Order #{order.orderId}</h3>
                    <div className="order-meta">
                      <span className="order-date">
                        <i className="fas fa-calendar"></i>
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="order-vehicle">
                        <i className="fas fa-car"></i>
                        {order.vehicleInfo?.vehicleType || 'Unknown'}
                      </span>
                      {order.priority && order.priority !== 'normal' && (
                        <span className={`priority-badge priority-${order.priority}`}>
                          <i className="fas fa-exclamation-circle"></i>
                          {order.priority}
                        </span>
                      )}
                    </div>
                  </div>
                  <div 
                    className="order-status-badge"
                    style={{ borderLeftColor: statusInfo.color }}
                  >
                    <i className={statusInfo.icon}></i>
                    <span>{statusInfo.label}</span>
                  </div>
                </div>

                <div className="order-items-summary">
                  <h4>Parts Requested ({order.items?.length || 0})</h4>
                  <div className="items-preview">
                    {order.items?.slice(0, 3).map((item, index) => (
                      <div key={index} className="item-tag">
                        {item.name} 
                        {item.quantity > 1 && <span className="quantity">x{item.quantity}</span>}
                        {item.urgency === 'high' && <span className="urgent-tag">URGENT</span>}
                      </div>
                    ))}
                    {order.items && order.items.length > 3 && (
                      <div className="more-items">
                        +{order.items.length - 3} more parts
                      </div>
                    )}
                  </div>
                </div>

                {order.quoteDetails && (
                  <div className="quote-info">
                    <i className="fas fa-file-invoice-dollar"></i>
                    <span>Quote: ${order.quoteDetails.totalAmount}</span>
                    {order.mechanicResponse?.status === 'pending' && (
                      <span className="action-required">Action Required</span>
                    )}
                  </div>
                )}

                <div className="order-actions">
                  <button 
                    onClick={() => viewOrderDetails(order)}
                    className="btn-primary"
                  >
                    <i className="fas fa-eye"></i> View Details
                  </button>
                  
                  {order.status === 'quoted' && (
                    <button 
                      onClick={() => navigate(`/mechanic/auto-parts/${order.orderId}/quote`)}
                      className="btn-success"
                    >
                      <i className="fas fa-check"></i> Review Quote
                    </button>
                  )}
                  
                  {order.status === 'draft' && (
                    <button 
                      onClick={() => navigate(`/mechanic/auto-parts/${order.orderId}/edit`)}
                      className="btn-outline"
                    >
                      <i className="fas fa-edit"></i> Continue Editing
                    </button>
                  )}
                </div>

                {order.estimatedResponseTime && (
                  <div className="order-estimate">
                    <i className="fas fa-clock"></i>
                    Estimated: {order.estimatedResponseTime}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-orders">
          <div className="no-orders-icon">
            <i className="fas fa-tools"></i>
          </div>
          <h3>No Parts Orders Yet</h3>
          <p>You haven't placed any parts orders for your workshop. Start by requesting parts for your jobs.</p>
          <div className="no-orders-actions">
            <button 
              onClick={() => navigate('/procure-auto-parts')}
              className="btn-primary"
            >
              <i className="fas fa-plus"></i> Place Your First Order
            </button>
            <button 
              onClick={refreshOrders}
              className="btn-outline"
            >
              <i className="fas fa-sync-alt"></i> Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MechanicTrackOrders;