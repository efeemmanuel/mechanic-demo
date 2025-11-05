import api from './api';

export const profileAPI = {
  // Get mechanic profile (BUSINESS info)
  getProfile: async () => {
    const response = await api.get('/mechanic/profile/my-profile');
    return response.data;
  },

  // Update mechanic profile (BUSINESS info)
  updateProfile: async (profileData) => {
    const response = await api.patch('/mechanic/profile/update', profileData);
    return response.data;
  },

  // Complete mechanic profile setup
  completeProfile: async (profileData) => {
    const response = await api.post('/mechanic/profile/complete', profileData);
    return response.data;
  }
};

export const userAPI = {
  // Get mechanic user profile (PERSONAL info)
  getUserProfile: async () => {
    const response = await api.get('/mechanic/user/profile');
    return response.data;
  },

  // Update mechanic user profile (PERSONAL info)
  updateUserProfile: async (userData) => {
    const response = await api.put('/mechanic/user/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post('/mechanic/user/change-password', passwordData);
    return response.data;
  }
};

export const supportAPI = {
  // Create mechanic support ticket
  createTicket: async (ticketData) => {
    const response = await api.post('/mechanic/support/tickets', ticketData);
    return response.data;
  },

  // Get mechanic's support tickets
  getTickets: async () => {
    const response = await api.get('/mechanic/support/tickets');
    return response.data;
  }
};

export default profileAPI;