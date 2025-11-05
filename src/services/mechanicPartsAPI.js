import api from './api';

export const mechanicPartsAPI = {
  // Create new parts order
  createOrder: async (orderData) => {
    const response = await api.post('/mechanic/auto-parts-orders', orderData);
    return response.data;
  },

  // Get mechanic's orders
  getMyOrders: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.priority) queryParams.append('priority', filters.priority);

    const response = await api.get(`/mechanic/auto-parts-orders/my-orders?${queryParams}`);
    return response.data;
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    const response = await api.get(`/mechanic/auto-parts-orders/${orderId}`);
    return response.data;
  },

  // Submit order to admin
  submitOrder: async (orderId) => {
    const response = await api.post(`/mechanic/auto-parts-orders/${orderId}/submit`);
    return response.data;
  },

  // Add item to order
  addItemToOrder: async (orderId, itemData) => {
    const response = await api.post(`/mechanic/auto-parts-orders/${orderId}/items`, itemData);
    return response.data;
  },

  // Remove item from order
  removeItemFromOrder: async (orderId, itemId) => {
    const response = await api.delete(`/mechanic/auto-parts-orders/${orderId}/items/${itemId}`);
    return response.data;
  },

  // Approve quote
  approveQuote: async (orderId, notes = '') => {
    const response = await api.post(`/mechanic/auto-parts-orders/${orderId}/approve-quote`, { notes });
    return response.data;
  },

  // Reject quote
  rejectQuote: async (orderId, notes = '', counterOffer = null) => {
    const response = await api.post(`/mechanic/auto-parts-orders/${orderId}/reject-quote`, { 
      notes, 
      counterOffer 
    });
    return response.data;
  },

  // Get order summary
  getOrderSummary: async (orderId) => {
    const response = await api.get(`/mechanic/auto-parts-orders/${orderId}/summary`);
    return response.data;
  },

  // Get mechanic order statistics
  getOrderStats: async () => {
    const response = await api.get('/mechanic/auto-parts-orders/stats');
    return response.data;
  },

  // Get suggested parts
  getSuggestedParts: async (vehicleType) => {
    const response = await api.get(`/mechanic/auto-parts-orders/suggested-parts?vehicleType=${vehicleType}`);
    return response.data;
  },

  // Upload files for order
  uploadFiles: async (orderId, files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('attachments', file);
    });

    const response = await api.post(`/mechanic/auto-parts-orders/${orderId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default mechanicPartsAPI;