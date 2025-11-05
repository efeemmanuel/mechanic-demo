// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor to include auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor to handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export const authAPI = {
//   register: async (userData) => {
//     const response = await api.post('/auth/register', userData);
//     return response.data;
//   },

//   login: async (email, password) => {
//     const response = await api.post('/auth/login', {
//       email,
//       password,
//       deviceInfo: {
//         deviceType: 'web',
//         os: navigator.platform,
//       },
//     });
//     return response.data;
//   },

//   verifyEmail: async (email, code) => {
//     const response = await api.post('/auth/verify', { email, code });
//     return response.data;
//   },

//   resendVerification: async (email) => {
//     const response = await api.post('/auth/resend-verification', { email });
//     return response.data;
//   },
// };

// // Mechanic-specific APIs
// export const mechanicAPI = {
//   // Get mechanic profile
//   getProfile: async () => {
//     const response = await api.get('/mechanic/profile');
//     return response.data;
//   },

//   // Update mechanic profile
//   updateProfile: async (profileData) => {
//     const response = await api.put('/mechanic/profile', profileData);
//     return response.data;
//   },

//   // Complete mechanic profile setup
//   completeProfile: async (profileData) => {
//     const response = await api.post('/mechanic/complete-profile', profileData);
//     return response.data;
//   },

//   // Get mechanic jobs/orders
//   getJobs: async (status = '') => {
//     const response = await api.get(`/mechanic/jobs${status ? `?status=${status}` : ''}`);
//     return response.data;
//   },

//   // Get specific job details
//   getJobDetails: async (jobId) => {
//     const response = await api.get(`/mechanic/jobs/${jobId}`);
//     return response.data;
//   },

//   // Update job status
//   updateJobStatus: async (jobId, status) => {
//     const response = await api.patch(`/mechanic/jobs/${jobId}/status`, { status });
//     return response.data;
//   },

//   // Submit quote for a job
//   submitQuote: async (jobId, quoteData) => {
//     const response = await api.post(`/mechanic/jobs/${jobId}/quote`, quoteData);
//     return response.data;
//   },

//   // Get mechanic earnings/analytics
//   getEarnings: async (period = 'monthly') => {
//     const response = await api.get(`/mechanic/earnings?period=${period}`);
//     return response.data;
//   },

//   // Update mechanic availability
//   updateAvailability: async (isAvailable) => {
//     const response = await api.patch('/mechanic/availability', { isAvailable });
//     return response.data;
//   },

//   // Get mechanic reviews
//   getReviews: async () => {
//     const response = await api.get('/mechanic/reviews');
//     return response.data;
//   },
// };

// // General APIs (shared with car owners)
// export const generalAPI = {
//   // Upload files
//   uploadFile: async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
    
//     const response = await api.post('/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//   // Get user profile
//   getUserProfile: async () => {
//     const response = await api.get('/user/profile');
//     return response.data;
//   },

//   // Update user profile
//   updateUserProfile: async (userData) => {
//     const response = await api.put('/user/profile', userData);
//     return response.data;
//   },

//   // Change password
//   changePassword: async (passwordData) => {
//     const response = await api.post('/user/change-password', passwordData);
//     return response.data;
//   },
// };

// export default api;












// sevices/api.js
// services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://asoro-backend.onrender.com/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/', {
      email,
      password
    });
    return response.data;
  },

  verifyEmail: async (email, code) => {
    const response = await api.post('/auth/verify', { email, code });
    return response.data;
  },

  resendVerification: async (email) => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  },
};

// Car Owner APIs
export const carOwnerAPI = {
  // Find mechanics
  findMechanics: async (searchCriteria) => {
    const response = await api.post('/mechanic/find', searchCriteria);
    return response.data;
  },

  // Get mechanic list
  getMechanicList: async () => {
    const response = await api.get('/mechanic/list');
    return response.data;
  },

  // Get search filters
  getSearchFilters: async () => {
    const response = await api.get('/mechanic/filters');
    return response.data;
  },

  // Get nearby mechanics
  getNearbyMechanics: async (coordinates) => {
    const response = await api.get('/mechanic/nearby', { params: coordinates });
    return response.data;
  },

  // Get mechanic details
  getMechanicDetails: async (mechanicId) => {
    const response = await api.get(`/mechanic/${mechanicId}`);
    return response.data;
  },

  // Create job order
  createJobOrder: async (orderData) => {
    const response = await api.post('/mechanic/job-orders', orderData);
    return response.data;
  },

  // Get job order details
  getJobOrderDetails: async (orderId) => {
    const response = await api.get(`/mechanic/job-orders/${orderId}`);
    return response.data;
  },

  // Get user job orders
  getUserJobOrders: async (userId, filters = {}) => {
    const response = await api.get(`/mechanic/job-orders/user/${userId}`, { params: filters });
    return response.data;
  },

  // Cancel job order
  cancelJobOrder: async (orderId) => {
    const response = await api.put(`/mechanic/job-orders/${orderId}/cancel`);
    return response.data;
  },

  // Get job order summary
  getJobOrderSummary: async (orderId) => {
    const response = await api.get(`/mechanic/job-orders/${orderId}/summary`);
    return response.data;
  },

  // Get mechanic quotes
  getMechanicQuotes: async (orderId) => {
    const response = await api.get(`/mechanic/job-orders/${orderId}/quotes`);
    return response.data;
  },

  // Accept quote
  acceptQuote: async (orderId, quoteData) => {
    const response = await api.post(`/mechanic/job-orders/${orderId}/accept-quote`, quoteData);
    return response.data;
  },

  // Update quantities
  updateQuoteQuantities: async (orderId, quantityData) => {
    const response = await api.put(`/mechanic/job-orders/${orderId}/update-quantities`, quantityData);
    return response.data;
  },

  // Generate invoice
  generateInvoice: async (orderId) => {
    const response = await api.post(`/mechanic/job-orders/${orderId}/generate-invoice`);
    return response.data;
  },

  // Process payment
  processPayment: async (orderId, paymentData) => {
    const response = await api.post(`/mechanic/job-orders/${orderId}/process-payment`, paymentData);
    return response.data;
  },

  // Get payment success
  getPaymentSuccess: async (orderId) => {
    const response = await api.get(`/mechanic/job-orders/${orderId}/payment-success`);
    return response.data;
  },

  // Get checkout summary
  getCheckoutSummary: async (orderId) => {
    const response = await api.get(`/mechanic/job-orders/${orderId}/checkout-summary`);
    return response.data;
  },

  // Get pending orders
  getPendingOrders: async (userId) => {
    const response = await api.get(`/mechanic/job-orders/user/${userId}/pending`);
    return response.data;
  }
};

// General APIs (shared with all users)
export const generalAPI = {
  // Upload files
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user profile
  getUserProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateUserProfile: async (userData) => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post('/user/change-password', passwordData);
    return response.data;
  },
};

export default api;