// services/mechanicAPI.js - COMPLETE MECHANIC ORDER API
import api from './api';

class MechanicAPI {
  /**
   * GET MECHANIC'S ORDERS
   */
  async getMechanicOrders(status = 'pending') {
    try {
      console.log('🔧 Fetching mechanic orders...');
      const response = await api.get(`/mechanic/orders?status=${status}`);
      console.log('✅ Mechanic orders response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching mechanic orders:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      throw new Error(error.response?.data?.message || 'Failed to load orders');
    }
  }

  /**
   * GET ORDER DETAILS
   */
  async getOrderDetails(orderId) {
    try {
      console.log('🔧 Fetching order details for:', orderId);
      const response = await api.get(`/mechanic/orders/${orderId}`);
      console.log('✅ Order details response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching order details:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to load order details');
    }
  }

  /**
   * SUBMIT QUOTE FOR ORDER
   */
  async submitQuote(orderId, quoteData) {
    try {
      console.log('🔧 Submitting quote for order:', orderId);
      const response = await api.post(`/mechanic/orders/${orderId}/quote`, quoteData);
      console.log('✅ Quote submitted response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error submitting quote:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to submit quote');
    }
  }

  /**
   * ACCEPT ORDER
   */
  async acceptOrder(orderId) {
    try {
      console.log('🔧 Accepting order:', orderId);
      const response = await api.post(`/mechanic/orders/${orderId}/accept`);
      console.log('✅ Order accepted response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error accepting order:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to accept order');
    }
  }

  /**
   * REJECT ORDER
   */
  async rejectOrder(orderId, reason) {
    try {
      console.log('🔧 Rejecting order:', orderId);
      const response = await api.post(`/mechanic/orders/${orderId}/reject`, { reason });
      console.log('✅ Order rejected response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error rejecting order:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to reject order');
    }
  }

  /**
   * UPDATE ORDER STATUS
   */
  async updateOrderStatus(orderId, status) {
    try {
      console.log('🔧 Updating order status:', orderId, status);
      const response = await api.put(`/mechanic/orders/${orderId}/status`, { status });
      console.log('✅ Order status updated response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update order status');
    }
  }

  /**
   * GET MECHANIC PROFILE
   */
  async getMechanicProfile() {
    try {
      console.log('🔧 Fetching mechanic profile...');
      const response = await api.get('/mechanic/profile');
      console.log('✅ Mechanic profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching mechanic profile:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to load mechanic profile');
    }
  }

  /**
   * UPDATE MECHANIC PROFILE
   */
  async updateMechanicProfile(profileData) {
    try {
      console.log('🔧 Updating mechanic profile...');
      const response = await api.put('/mechanic/profile', profileData);
      console.log('✅ Mechanic profile updated response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating mechanic profile:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update mechanic profile');
    }
  }

  /**
   * UPDATE AVAILABILITY
   */
  async updateAvailability(isAvailable) {
    try {
      console.log('🔧 Updating availability:', isAvailable);
      const response = await api.put('/mechanic/availability', { isAvailable });
      console.log('✅ Availability updated response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating availability:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update availability');
    }
  }

  /**
   * GET MECHANIC STATISTICS
   */
  async getStatistics() {
    try {
      console.log('🔧 Fetching mechanic statistics...');
      const response = await api.get('/mechanic/statistics');
      console.log('✅ Mechanic statistics response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching mechanic statistics:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to load statistics');
    }
  }

  /**
   * GET MECHANIC EARNINGS
   */
  async getEarnings(period = 'monthly') {
    try {
      console.log('🔧 Fetching mechanic earnings...');
      const response = await api.get(`/mechanic/earnings?period=${period}`);
      console.log('✅ Mechanic earnings response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching mechanic earnings:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to load earnings');
    }
  }

  /**
   * GET MECHANIC REVIEWS
   */
  async getReviews() {
    try {
      console.log('🔧 Fetching mechanic reviews...');
      const response = await api.get('/mechanic/reviews');
      console.log('✅ Mechanic reviews response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching mechanic reviews:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to load reviews');
    }
  }

  /**
   * COMPLETE MECHANIC PROFILE SETUP
   */
  async completeProfile(profileData) {
    try {
      console.log('🔧 Completing mechanic profile setup...');
      const response = await api.post('/mechanic/complete-profile', profileData);
      console.log('✅ Profile setup completed:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error completing profile setup:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to complete profile setup');
    }
  }

  /**
   * GET MECHANIC DASHBOARD SUMMARY
   */
  async getDashboardSummary() {
    try {
      console.log('🔧 Fetching dashboard summary...');
      const response = await api.get('/mechanic/dashboard');
      console.log('✅ Dashboard summary response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching dashboard summary:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to load dashboard summary');
    }
  }

  /**
   * GET MECHANIC NOTIFICATIONS
   */
  async getNotifications() {
    try {
      console.log('🔧 Fetching mechanic notifications...');
      const response = await api.get('/mechanic/notifications');
      console.log('✅ Notifications response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching notifications:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to load notifications');
    }
  }

  /**
   * MARK NOTIFICATION AS READ
   */
  async markNotificationAsRead(notificationId) {
    try {
      console.log('🔧 Marking notification as read:', notificationId);
      const response = await api.put(`/mechanic/notifications/${notificationId}/read`);
      console.log('✅ Notification marked as read:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error marking notification as read:', error);
      console.error('Error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  }
  




}

export const mechanicAPI = new MechanicAPI();