// // services/mechanicChatAPI.js
// import api from './api';

// export const mechanicChatAPI = {
//   // Start chat with car owner (mechanic initiates)
//   startChatWithCarOwner: async (carOwnerId, jobOrderId = null) => {
//     const response = await api.post('/mechanic/chats/start', {
//       carOwnerId,
//       jobOrderId
//     });
//     return response.data;
//   },

//   // Get mechanic's chats
//   getMechanicChats: async (page = 1, limit = 20) => {
//     const response = await api.get('/mechanic/chats/my-chats', {
//       params: { page, limit }
//     });
//     return response.data;
//   },

//   // Get chat messages
//   getChatMessages: async (chatId, page = 1, limit = 50) => {
//     const response = await api.get(`/mechanic/chats/${chatId}/messages`, {
//       params: { page, limit }
//     });
//     return response.data;
//   },

//   // Send message
//   sendMessage: async (chatId, messageData) => {
//     const response = await api.post(`/mechanic/chats/${chatId}/messages`, messageData);
//     return response.data;
//   },

//   // Send quote
//   sendQuote: async (chatId, quoteData) => {
//     const response = await api.post(`/mechanic/chats/${chatId}/quote`, quoteData);
//     return response.data;
//   },

//   // Upload attachments
//   uploadAttachments: async (files) => {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('attachments', file);
//     });
    
//     const response = await api.post('/mechanic/chats/upload-attachments', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   },

//   // Mark message as read
//   markMessageAsRead: async (messageId) => {
//     const response = await api.post(`/mechanic/chats/messages/${messageId}/read`);
//     return response.data;
//   },

//   // Mark all messages as read
//   markAllMessagesAsRead: async (chatId) => {
//     const response = await api.post(`/mechanic/chats/${chatId}/mark-all-read`);
//     return response.data;
//   },

//   // Get chat by job order
//   getChatByJobOrder: async (jobOrderId) => {
//     const response = await api.get(`/mechanic/chats/job-order/${jobOrderId}`);
//     return response.data;
//   },

//   // Get chat statistics
//   getChatStats: async () => {
//     const response = await api.get('/mechanic/chats/stats');
//     return response.data;
//   },

//   // Search chats
//   searchChats: async (query, page = 1, limit = 20) => {
//     const response = await api.get('/mechanic/chats/search', {
//       params: { query, page, limit }
//     });
//     return response.data;
//   }
// };




// services/mechanicChatAPI.js
import api from './api';

export const mechanicChatAPI = {
  // Start chat with car owner (mechanic initiates)
  startChatWithCarOwner: async (carOwnerId, jobOrderId = null) => {
    const response = await api.post('/mechanic/chats/start', {
      carOwnerId,
      jobOrderId
    });
    return response.data;
  },

  // Get mechanic's chats
  getMechanicChats: async (page = 1, limit = 20) => {
    const response = await api.get('/mechanic/chats/my-chats', {
      params: { page, limit }
    });
    return response.data;
  },

  // Get chat messages
  getChatMessages: async (chatId, page = 1, limit = 50) => {
    const response = await api.get(`/mechanic/chats/${chatId}/messages`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Send message
  sendMessage: async (chatId, messageData) => {
    const response = await api.post(`/mechanic/chats/${chatId}/messages`, messageData);
    return response.data;
  },

  // Upload attachments
  uploadAttachments: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('attachments', file);
    });
    
    const response = await api.post('/mechanic/chats/upload-attachments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Mark message as read
  markMessageAsRead: async (messageId) => {
    const response = await api.post(`/mechanic/chats/messages/${messageId}/read`);
    return response.data;
  },

  // Mark all messages as read
  markAllMessagesAsRead: async (chatId) => {
    const response = await api.post(`/mechanic/chats/${chatId}/mark-all-read`);
    return response.data;
  },

  // Get chat by job order
  getChatByJobOrder: async (jobOrderId) => {
    const response = await api.get(`/mechanic/chats/job-order/${jobOrderId}`);
    return response.data;
  },

  // Get chat statistics
  getChatStats: async () => {
    const response = await api.get('/mechanic/chats/stats');
    return response.data;
  },

  // Search chats
  searchChats: async (query, page = 1, limit = 20) => {
    const response = await api.get('/mechanic/chats/search', {
      params: { query, page, limit }
    });
    return response.data;
  },

  // Get unread notifications
  getUnreadNotifications: async () => {
    const response = await api.get('/mechanic/notifications/unread');
    return response.data;
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    const response = await api.post(`/mechanic/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async () => {
    const response = await api.post('/mechanic/notifications/mark-all-read');
    return response.data;
  }
};