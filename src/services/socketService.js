// // services/socketService.js
// class SocketService {
//   constructor() {
//     this.socket = null;
//     this.isConnected = false;
//     this.reconnectAttempts = 0;
//     this.maxReconnectAttempts = 5;
//     this.reconnectInterval = 3000;
//     this.eventCallbacks = new Map();
//     this.pingInterval = null;
//   }

//   connect(token) {
//     try {
//       // Close existing connection if any
//       if (this.socket) {
//         this.socket.close();
//       }

//       // Create WebSocket connection - adjust URL to your backend
//       const wsUrl = process.env.NODE_ENV === 'production' 
//         ? `wss://yourdomain.com/ws?token=${token}`
//         : `ws://localhost:3001/ws?token=${token}`;
      
//       this.socket = new WebSocket(wsUrl);

//       this.socket.onopen = () => {
//         console.log('✅ WebSocket connected successfully');
//         this.isConnected = true;
//         this.reconnectAttempts = 0;
//         this.triggerEvent('connected', { message: 'Connected to real-time service' });
        
//         // Start ping to keep connection alive
//         this.startPing();
//       };

//       this.socket.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           console.log('📨 WebSocket message received:', data);
//           this.triggerEvent(data.type, data.data);
//         } catch (error) {
//           console.error('Error parsing WebSocket message:', error);
//         }
//       };

//       this.socket.onclose = (event) => {
//         console.log('🔌 WebSocket disconnected:', event.code, event.reason);
//         this.isConnected = false;
//         this.stopPing();
//         this.triggerEvent('disconnected', { code: event.code, reason: event.reason });
        
//         if (event.code !== 1000) { // Don't reconnect if closed normally
//           this.handleReconnection(token);
//         }
//       };

//       this.socket.onerror = (error) => {
//         console.error('❌ WebSocket error:', error);
//         this.triggerEvent('error', { error });
//       };

//     } catch (error) {
//       console.error('❌ WebSocket connection failed:', error);
//       this.handleReconnection(token);
//     }
//   }

//   startPing() {
//     this.pingInterval = setInterval(() => {
//       if (this.isConnected) {
//         this.send({ type: 'ping' });
//       }
//     }, 30000); // Ping every 30 seconds
//   }

//   stopPing() {
//     if (this.pingInterval) {
//       clearInterval(this.pingInterval);
//       this.pingInterval = null;
//     }
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.close(1000, 'Normal closure');
//       this.socket = null;
//     }
//     this.isConnected = false;
//     this.stopPing();
//   }

//   send(message) {
//     if (this.isConnected && this.socket) {
//       this.socket.send(JSON.stringify(message));
//       return true;
//     } else {
//       console.warn('WebSocket not connected, message not sent:', message);
//       return false;
//     }
//   }

//   on(event, callback) {
//     if (!this.eventCallbacks.has(event)) {
//       this.eventCallbacks.set(event, []);
//     }
//     this.eventCallbacks.get(event).push(callback);
//   }

//   off(event, callback) {
//     if (this.eventCallbacks.has(event)) {
//       const callbacks = this.eventCallbacks.get(event);
//       const index = callbacks.indexOf(callback);
//       if (index > -1) {
//         callbacks.splice(index, 1);
//       }
//     }
//   }

//   triggerEvent(event, data) {
//     if (this.eventCallbacks.has(event)) {
//       this.eventCallbacks.get(event).forEach(callback => {
//         try {
//           callback(data);
//         } catch (error) {
//           console.error(`Error in event callback for ${event}:`, error);
//         }
//       });
//     }
//   }

//   joinChat(chatId) {
//     return this.send({
//       type: 'join_chat',
//       chatId: chatId
//     });
//   }

//   leaveChat(chatId) {
//     return this.send({
//       type: 'leave_chat',
//       chatId: chatId
//     });
//   }

//   sendTypingStart(chatId, userInfo) {
//     return this.send({
//       type: 'typing_start',
//       chatId: chatId,
//       userInfo: userInfo
//     });
//   }

//   sendTypingStop(chatId, userInfo) {
//     return this.send({
//       type: 'typing_stop',
//       chatId: chatId,
//       userInfo: userInfo
//     });
//   }

//   handleReconnection(token) {
//     if (this.reconnectAttempts < this.maxReconnectAttempts) {
//       this.reconnectAttempts++;
//       const delay = this.reconnectInterval * this.reconnectAttempts;
      
//       console.log(`🔄 Attempting to reconnect in ${delay}ms... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
//       setTimeout(() => {
//         if (!this.isConnected) {
//           this.connect(token);
//         }
//       }, delay);
//     } else {
//       console.error('❌ Max reconnection attempts reached');
//       this.triggerEvent('reconnection_failed', { attempts: this.reconnectAttempts });
//     }
//   }
// }

// export const socketService = new SocketService();