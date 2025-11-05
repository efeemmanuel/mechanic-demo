// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ added for back navigation
// import "../styles/Chat.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Chat() {
//   const navigate = useNavigate(); // ✅ navigate hook
//   const [conversations, setConversations] = useState([
//     {
//       id: 1,
//       name: "Alice",
//       lastMessage: "See you tomorrow!",
//       online: true,
//       lastSeen: "10:20 AM",
//       unread: 0,
//       avatar: "https://randomuser.me/api/portraits/women/65.jpg",
//     },
//     {
//       id: 2,
//       name: "Bob",
//       lastMessage: "Let’s catch up later.",
//       online: false,
//       lastSeen: "9:15 AM",
//       unread: 2,
//       avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//     },
//     {
//       id: 3,
//       name: "Charlie",
//       lastMessage: "Thanks for the update.",
//       online: true,
//       lastSeen: "Now",
//       unread: 1,
//       avatar: "https://randomuser.me/api/portraits/men/52.jpg",
//     },
//   ]);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState({
//     1: [
//       { id: 1, from: "Alice", text: "Hello! How are you?", time: "10:30 AM" },
//       { id: 2, from: "You", text: "I’m good, thanks!", time: "10:32 AM" },
//     ],
//     2: [{ id: 1, from: "Bob", text: "Hey, long time!", time: "09:15 AM" }],
//     3: [{ id: 1, from: "Charlie", text: "Project update sent!", time: "Now" }],
//   });

//   const [input, setInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [attachment, setAttachment] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState({
//     open: false,
//     userId: null,
//     messageId: null,
//   });
//   const [showSidebar, setShowSidebar] = useState(true);

//   const handleSend = () => {
//     if (!selectedUser || (input.trim() === "" && !attachment)) return;

//     const newMessage = {
//       id: Date.now(),
//       from: "You",
//       text: input,
//       time: "Now",
//       attachment: attachment || null,
//     };

//     setMessages((prev) => ({
//       ...prev,
//       [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
//     }));

//     setConversations((prev) =>
//       prev.map((conv) =>
//         conv.id === selectedUser.id
//           ? { ...conv, lastMessage: input || "📎 Attachment", unread: 0 }
//           : conv
//       )
//     );

//     setInput("");
//     setAttachment(null);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setAttachment(file);
//   };

//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//     setShowSidebar(false);
//     setConversations((prev) =>
//       prev.map((conv) => (conv.id === user.id ? { ...conv, unread: 0 } : conv))
//     );
//   };

//   // ✅ back button now goes to dashboard
//   const handleBack = () => {
//     navigate("/dashboard");
//   };

//   const askDeleteMessage = (userId, messageId) => {
//     setDeleteConfirm({ open: true, userId, messageId });
//   };

//   const confirmDeleteMessage = () => {
//     setMessages((prev) => ({
//       ...prev,
//       [deleteConfirm.userId]: prev[deleteConfirm.userId].filter(
//         (msg) => msg.id !== deleteConfirm.messageId
//       ),
//     }));
//     setDeleteConfirm({ open: false, userId: null, messageId: null });
//   };

//   const cancelDelete = () => {
//     setDeleteConfirm({ open: false, userId: null, messageId: null });
//   };

//   const filteredConversations = conversations.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="chat-wrapper">
//       {/* Sidebar */}
//       <div
//         className={`chat-sidebar-modern ${
//           showSidebar ? "visible" : "hidden-mobile"
//         }`}
//       >
//         <div className="chat-search-box">
//           {/* ✅ Back button now navigates to Dashboard */}
//           <button className="back-btn" onClick={handleBack}>
//             <i className="fas fa-arrow-left"></i>
//           </button>
//           <i className="fas fa-search"></i>
//           <input
//             type="text"
//             placeholder="Search or start new chat..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="chat-list">
//           {filteredConversations.map((user) => (
//             <div
//               key={user.id}
//               className={`chat-list-item ${
//                 selectedUser?.id === user.id ? "active" : ""
//               }`}
//               onClick={() => handleSelectUser(user)}
//             >
//               <img src={user.avatar} alt={user.name} className="chat-avatar" />
//               <div className="chat-info">
//                 <h4>{user.name}</h4>
//                 <p>{user.lastMessage}</p>
//               </div>
//               <div className="chat-meta">
//                 {user.online ? (
//                   <span className="online-dot"></span>
//                 ) : (
//                   <span className="offline-dot"></span>
//                 )}
//                 {user.unread > 0 && (
//                   <span className="unread-badge">{user.unread}</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div
//         className={`chat-main-modern ${
//           showSidebar ? "hidden-mobile" : "visible"
//         }`}
//       >
//         {selectedUser ? (
//           <>
//             <div className="chat-header-modern">
//               <div className="header-left">
//                 <button
//                   className="back-btn-mobile"
//                   onClick={() => setShowSidebar(true)}
//                 >
//                   <i className="fas fa-arrow-left"></i>
//                 </button>
//                 <img
//                   src={selectedUser.avatar}
//                   alt={selectedUser.name}
//                   className="chat-avatar"
//                 />
//                 <div>
//                   <h4>{selectedUser.name}</h4>
//                   <p>
//                     {selectedUser.online
//                       ? "Online"
//                       : `Last seen ${selectedUser.lastSeen}`}
//                   </p>
//                 </div>
//               </div>
//               <div className="header-right">
//                 <i
//                   className="fas fa-ellipsis-v"
//                   onClick={() => setShowOptions(!showOptions)}
//                 ></i>
//                 {showOptions && (
//                   <div
//                     className="chat-dropdown"
//                     onMouseLeave={() => setShowOptions(false)}
//                   >
//                     <button>View Profile</button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="chat-body-modern">
//               {(messages[selectedUser.id] || []).map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`chat-bubble ${
//                     msg.from === "You" ? "sent" : "received"
//                   }`}
//                 >
//                   <div className="bubble-content">
//                     {msg.text && <p>{msg.text}</p>}
//                     {msg.attachment && (
//                       <div className="attachment-preview">
//                         {msg.attachment.type.startsWith("image/") ? (
//                           <img
//                             src={URL.createObjectURL(msg.attachment)}
//                             alt="attachment"
//                             className="chat-image"
//                           />
//                         ) : (
//                           <a
//                             href={URL.createObjectURL(msg.attachment)}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="file-link"
//                           >
//                             <i className="fas fa-paperclip"></i>{" "}
//                             {msg.attachment.name}
//                           </a>
//                         )}
//                       </div>
//                     )}
//                     <span className="bubble-time">{msg.time}</span>
//                     {msg.from === "You" && (
//                       <button
//                         className="delete-btn"
//                         onClick={() => askDeleteMessage(selectedUser.id, msg.id)}
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="chat-input-modern">
//               <label htmlFor="file-upload" className="attach-btn">
//                 <i className="fas fa-paperclip"></i>
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//               {attachment && (
//                 <span className="attached-file-name">
//                   {attachment.name}
//                   <button
//                     className="remove-attachment"
//                     onClick={() => setAttachment(null)}
//                   >
//                     ✕
//                   </button>
//                 </span>
//               )}
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               />
//               <button className="send-btn" onClick={handleSend}>
//                 <i className="fas fa-paper-plane"></i>
//               </button>
//             </div>

//             {/* Delete Modal */}
//             {deleteConfirm.open && (
//               <div className="modal-overlay">
//                 <div className="modal-box">
//                   <p>Delete this message?</p>
//                   <div className="modal-actions">
//                     <button onClick={cancelDelete}>Cancel</button>
//                     <button className="confirm" onClick={confirmDeleteMessage}>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="chat-placeholder">
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }















// // components/MechanicChat.js
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { mechanicChatAPI } from "../services/mechanicChatAPI";
// import { socketService } from "../services/socketService";
// import { notificationService } from "../services/notificationService";
// import "../styles/MechanicChat.css";

// export default function MechanicChat() {
//   const navigate = useNavigate();
//   const [conversations, setConversations] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [attachments, setAttachments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sending, setSending] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [user, setUser] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState(new Set());
//   const [typingUsers, setTypingUsers] = useState(new Map());

//   const chatBodyRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     setUser(userData);
    
//     // Initialize services
//     initializeServices();
//     loadChats();
//     loadNotifications();

//     return () => {
//       // Cleanup
//       socketService.disconnect();
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//     };
//   }, []);

//   const initializeServices = async () => {
//     // Request notification permission
//     await notificationService.requestPermission();

//     // Connect to real-time service
//     const token = localStorage.getItem('token');
//     socketService.connect(token);

//     // Set up event listeners
//     socketService.on('connected', handleSocketConnected);
//     socketService.on('new_message', handleNewMessage);
//     socketService.on('user_online', handleUserOnline);
//     socketService.on('user_offline', handleUserOffline);
//     socketService.on('typing_start', handleTypingStart);
//     socketService.on('typing_stop', handleTypingStop);
//     socketService.on('message_read', handleMessageRead);
//   };

//   const handleSocketConnected = (data) => {
//     console.log('✅ Connected to real-time service:', data);
//   };

//   const handleNewMessage = (message) => {
//     console.log('📨 New message received:', message);
    
//     // If message is for current chat, add to messages
//     if (selectedChat && message.chatId === selectedChat._id) {
//       setMessages(prev => [...prev, message]);
      
//       // Mark as read
//       mechanicChatAPI.markMessageAsRead(message._id);
//     } else {
//       // Update conversation list with new message
//       setConversations(prev => 
//         prev.map(conv => 
//           conv._id === message.chatId 
//             ? { 
//                 ...conv, 
//                 lastMessage: {
//                   message: message.content || 'Attachment',
//                   sentAt: message.createdAt
//                 },
//                 unreadCount: (conv.unreadCount || 0) + 1
//               } 
//             : conv
//         )
//       );

//       // Show notification
//       const chat = conversations.find(c => c._id === message.chatId);
//       if (chat) {
//         notificationService.showNewMessageNotification(message, {
//           carOwnerName: `${chat.otherParticipant.firstName} ${chat.otherParticipant.lastName}`,
//           avatar: chat.otherParticipant.profileImage
//         });
//       }
//     }
//   };

//   const handleUserOnline = (userId) => {
//     setOnlineUsers(prev => new Set(prev).add(userId));
//   };

//   const handleUserOffline = (userId) => {
//     setOnlineUsers(prev => {
//       const newSet = new Set(prev);
//       newSet.delete(userId);
//       return newSet;
//     });
//   };

//   const handleTypingStart = (data) => {
//     if (selectedChat && data.chatId === selectedChat._id) {
//       setTypingUsers(prev => new Map(prev).set(data.userId, data.userName));
      
//       // Clear previous timeout
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
      
//       // Auto remove typing indicator after 3 seconds
//       typingTimeoutRef.current = setTimeout(() => {
//         handleTypingStop(data);
//       }, 3000);
//     }
//   };

//   const handleTypingStop = (data) => {
//     setTypingUsers(prev => {
//       const newMap = new Map(prev);
//       newMap.delete(data.userId);
//       return newMap;
//     });
//   };

//   const handleMessageRead = (data) => {
//     // Update message status in current chat
//     if (selectedChat && data.chatId === selectedChat._id) {
//       setMessages(prev => 
//         prev.map(msg => 
//           data.messageIds.includes(msg._id) 
//             ? { ...msg, status: 'read', readBy: data.readBy }
//             : msg
//         )
//       );
//     }
//   };

//   const loadChats = async () => {
//     try {
//       setLoading(true);
//       const response = await mechanicChatAPI.getMechanicChats();
//       setConversations(response.data.chats || []);
//     } catch (error) {
//       console.error("Error loading chats:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadNotifications = async () => {
//     try {
//       const response = await mechanicChatAPI.getUnreadNotifications();
//       setNotifications(response.data || []);
//     } catch (error) {
//       console.error("Error loading notifications:", error);
//     }
//   };

//   const loadMessages = async (chatId) => {
//     try {
//       const response = await mechanicChatAPI.getChatMessages(chatId);
//       setMessages(response.data.messages || []);
      
//       // Mark all messages as read when opening chat
//       await mechanicChatAPI.markAllMessagesAsRead(chatId);
      
//       // Update unread count in conversations
//       setConversations(prev => 
//         prev.map(conv => 
//           conv._id === chatId ? { ...conv, unreadCount: 0 } : conv
//         )
//       );

//       // Join chat room for real-time updates
//       socketService.joinChat(chatId);
//     } catch (error) {
//       console.error("Error loading messages:", error);
//     }
//   };

//   const handleSelectChat = async (chat) => {
//     setSelectedChat(chat);
//     setShowSidebar(false);
//     await loadMessages(chat._id);
//   };

//   const handleSend = async () => {
//     if ((!input.trim() && attachments.length === 0) || sending) return;

//     try {
//       setSending(true);
      
//       let uploadedAttachments = [];
//       if (attachments.length > 0) {
//         const uploadResponse = await mechanicChatAPI.uploadAttachments(attachments);
//         uploadedAttachments = uploadResponse.data.attachments || [];
//       }

//       const messageData = {
//         content: input.trim(),
//         messageType: attachments.length > 0 ? 'file' : 'text',
//         attachments: uploadedAttachments
//       };

//       const response = await mechanicChatAPI.sendMessage(selectedChat._id, messageData);
//       const newMessage = response.data;

//       // Add message to UI immediately
//       setMessages(prev => [...prev, newMessage]);
//       setInput("");
//       setAttachments([]);
      
//       // Update last message in conversations
//       setConversations(prev =>
//         prev.map(conv =>
//           conv._id === selectedChat._id
//             ? { 
//                 ...conv, 
//                 lastMessage: {
//                   message: input || 'Attachment',
//                   sentAt: new Date()
//                 }
//               }
//             : conv
//         )
//       );

//       // Send typing stop event
//       socketService.sendMessage({
//         type: 'typing_stop',
//         chatId: selectedChat._id,
//         userId: user.id
//       });

//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleTyping = () => {
//     if (selectedChat && input.trim()) {
//       socketService.sendMessage({
//         type: 'typing_start',
//         chatId: selectedChat._id,
//         userId: user.id,
//         userName: `${user.firstName} ${user.lastName}`
//       });
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setAttachments(prev => [...prev, ...files]);
//     e.target.value = "";
//   };

//   const removeAttachment = (index) => {
//     setAttachments(prev => prev.filter((_, i) => i !== index));
//   };

//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       await mechanicChatAPI.markNotificationAsRead(notificationId);
//       setNotifications(prev => prev.filter(n => n._id !== notificationId));
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   const markAllNotificationsAsRead = async () => {
//     try {
//       await mechanicChatAPI.markAllNotificationsAsRead();
//       setNotifications([]);
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//     }
//   };

//   const filteredConversations = conversations.filter(chat =>
//     chat.otherParticipant?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
//     chat.otherParticipant?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
//     chat.jobOrder?.orderId?.toLowerCase().includes(search.toLowerCase())
//   );

//   const scrollToBottom = () => {
//     if (chatBodyRef.current) {
//       setTimeout(() => {
//         chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//       }, 100);
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, typingUsers]);

//   const typingUsersArray = Array.from(typingUsers.values());
//   const isCarOwnerOnline = selectedChat && onlineUsers.has(selectedChat.otherParticipant.userId);

//   return (
//     <div className="mechanic-chat-wrapper">
//       {/* Sidebar */}
//       <div className={`chat-sidebar ${showSidebar ? "visible" : "hidden-mobile"}`}>
//         <div className="chat-header">
//           <button className="back-btn" onClick={() => navigate("/mechanic/dashboard")}>
//             <i className="fas fa-arrow-left"></i>
//           </button>
//           <h3>Messages</h3>
//           {notifications.length > 0 && (
//             <button 
//               className="notifications-btn"
//               onClick={markAllNotificationsAsRead}
//               title="Mark all as read"
//             >
//               <i className="fas fa-bell"></i>
//               <span className="notification-count">{notifications.length}</span>
//             </button>
//           )}
//         </div>

//         <div className="chat-search">
//           <i className="fas fa-search"></i>
//           <input
//             type="text"
//             placeholder="Search conversations..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Notifications Panel */}
//         {notifications.length > 0 && (
//           <div className="notifications-panel">
//             <div className="notifications-header">
//               <span>Notifications</span>
//               <button onClick={markAllNotificationsAsRead}>Clear All</button>
//             </div>
//             {notifications.map(notification => (
//               <div key={notification._id} className="notification-item">
//                 <div className="notification-content">
//                   <p>{notification.message}</p>
//                   <span className="notification-time">
//                     {new Date(notification.createdAt).toLocaleTimeString()}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={() => markNotificationAsRead(notification._id)}
//                   className="mark-read-btn"
//                 >
//                   <i className="fas fa-check"></i>
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="chat-list">
//           {loading ? (
//             <div className="loading">Loading conversations...</div>
//           ) : filteredConversations.length === 0 ? (
//             <div className="no-chats">No conversations found</div>
//           ) : (
//             filteredConversations.map(chat => (
//               <div
//                 key={chat._id}
//                 className={`chat-item ${selectedChat?._id === chat._id ? "active" : ""}`}
//                 onClick={() => handleSelectChat(chat)}
//               >
//                 <div className="chat-avatar-container">
//                   <img
//                     src={chat.otherParticipant?.profileImage || "https://via.placeholder.com/40"}
//                     alt={chat.otherParticipant?.firstName}
//                     className="chat-avatar"
//                   />
//                   {onlineUsers.has(chat.otherParticipant.userId) && (
//                     <div className="online-indicator"></div>
//                   )}
//                 </div>
//                 <div className="chat-info">
//                   <h4>
//                     {chat.otherParticipant?.firstName} {chat.otherParticipant?.lastName}
//                     {chat.jobOrder && <span className="job-badge">#{chat.jobOrder.orderId}</span>}
//                   </h4>
//                   <p className="last-message">
//                     {chat.lastMessage?.message || "No messages yet"}
//                   </p>
//                   <span className="last-time">
//                     {chat.lastMessage?.sentAt ? 
//                       new Date(chat.lastMessage.sentAt).toLocaleTimeString([], { 
//                         hour: '2-digit', 
//                         minute: '2-digit' 
//                       }) : 
//                       "New"
//                     }
//                   </span>
//                 </div>
//                 {chat.unreadCount > 0 && (
//                   <span className="unread-badge">{chat.unreadCount}</span>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Chat Main Area */}
//       <div className={`chat-main ${showSidebar ? "hidden-mobile" : "visible"}`}>
//         {selectedChat ? (
//           <>
//             <div className="chat-header-main">
//               <button 
//                 className="back-btn-mobile"
//                 onClick={() => setShowSidebar(true)}
//               >
//                 <i className="fas fa-arrow-left"></i>
//               </button>
//               <div className="chat-avatar-container">
//                 <img
//                   src={selectedChat.otherParticipant?.profileImage || "https://via.placeholder.com/40"}
//                   alt={selectedChat.otherParticipant?.firstName}
//                   className="chat-avatar"
//                 />
//                 {isCarOwnerOnline && <div className="online-indicator"></div>}
//               </div>
//               <div className="chat-partner-info">
//                 <h4>
//                   {selectedChat.otherParticipant?.firstName} {selectedChat.otherParticipant?.lastName}
//                   {selectedChat.jobOrder && (
//                     <span className="job-badge">#{selectedChat.jobOrder.orderId}</span>
//                   )}
//                 </h4>
//                 <p className="partner-status">
//                   {isCarOwnerOnline ? (
//                     <span className="online-text">Online</span>
//                   ) : (
//                     <span className="offline-text">Offline</span>
//                   )}
//                   <span className="partner-phone">
//                     <i className="fas fa-phone"></i> {selectedChat.otherParticipant?.phone}
//                   </span>
//                 </p>
//               </div>
//               <div className="chat-actions">
//                 <button className="call-btn" title="Call">
//                   <i className="fas fa-phone"></i>
//                 </button>
//                 <button className="info-btn" title="Info">
//                   <i className="fas fa-info-circle"></i>
//                 </button>
//               </div>
//             </div>

//             <div className="chat-messages" ref={chatBodyRef}>
//               {messages.map(message => (
//                 <div
//                   key={message._id}
//                   className={`message ${message.sender.role === 'mechanic' ? 'sent' : 'received'}`}
//                 >
//                   <div className="message-content">
//                     {message.content && <p>{message.content}</p>}
//                     {message.attachments && message.attachments.map((attachment, index) => (
//                       <div key={index} className="attachment">
//                         {attachment.mimetype.startsWith('image/') ? (
//                           <img src={attachment.url} alt="Attachment" />
//                         ) : (
//                           <a href={attachment.url} target="_blank" rel="noopener noreferrer">
//                             <i className="fas fa-file"></i> {attachment.originalName}
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                     <div className="message-footer">
//                       <span className="message-time">
//                         {new Date(message.createdAt).toLocaleTimeString([], {
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                       </span>
//                       {message.sender.role === 'mechanic' && (
//                         <span className="message-status">
//                           {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Typing Indicator */}
//               {typingUsersArray.length > 0 && (
//                 <div className="typing-indicator">
//                   <div className="typing-dots">
//                     <span></span>
//                     <span></span>
//                     <span></span>
//                   </div>
//                   <span className="typing-text">
//                     {typingUsersArray.join(', ')} {typingUsersArray.length === 1 ? 'is' : 'are'} typing...
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Attachments Preview */}
//             {attachments.length > 0 && (
//               <div className="attachments-preview">
//                 {attachments.map((file, index) => (
//                   <div key={index} className="attachment-preview">
//                     <i className={`fas ${file.type.startsWith('image/') ? 'fa-image' : 'fa-file'}`}></i>
//                     <span>{file.name}</span>
//                     <button onClick={() => removeAttachment(index)}>
//                       <i className="fas fa-times"></i>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Input Area */}
//             <div className="chat-input-area">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 style={{ display: 'none' }}
//                 multiple
//                 onChange={handleFileChange}
//                 accept="image/*,video/*,.pdf,.doc,.docx,.txt"
//               />
//               <button
//                 className="attach-btn"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <i className="fas fa-paperclip"></i>
//               </button>
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={input}
//                 onChange={(e) => {
//                   setInput(e.target.value);
//                   handleTyping();
//                 }}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                 disabled={sending}
//               />
//               <button
//                 className="send-btn"
//                 onClick={handleSend}
//                 disabled={sending || (!input.trim() && attachments.length === 0)}
//               >
//                 {sending ? (
//                   <i className="fas fa-spinner fa-spin"></i>
//                 ) : (
//                   <i className="fas fa-paper-plane"></i>
//                 )}
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="no-chat-selected">
//             <i className="fas fa-comments"></i>
//             <p>Select a conversation to start messaging</p>
//             <small>Real-time messaging is enabled</small>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




























// components/MechanicChat.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { mechanicChatAPI } from "../services/mechanicChatAPI";
// import { socketService } from "../services/socketService";
import { notificationService } from "../services/notificationService";
import "../styles/Chat.css";

export default function MechanicChat() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Map());

  const chatBodyRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    
    // Initialize services
    initializeServices();
    loadChats();
    loadNotifications();

    return () => {
      // Cleanup
      socketService.disconnect();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const initializeServices = async () => {
    // Request notification permission
    await notificationService.requestPermission();

    // Connect to real-time service
    const token = localStorage.getItem('token');
    socketService.connect(token);

    // Set up event listeners
    socketService.on('connected', handleSocketConnected);
    socketService.on('new_message', handleNewMessage);
    socketService.on('user_online', handleUserOnline);
    socketService.on('user_offline', handleUserOffline);
    socketService.on('typing_start', handleTypingStart);
    socketService.on('typing_stop', handleTypingStop);
    socketService.on('message_read', handleMessageRead);
  };

  const handleSocketConnected = (data) => {
    console.log('✅ Connected to real-time service:', data);
  };

  const handleNewMessage = (message) => {
    console.log('📨 New message received:', message);
    
    // If message is for current chat, add to messages
    if (selectedChat && message.chatId === selectedChat._id) {
      setMessages(prev => [...prev, message]);
      
      // Mark as read
      mechanicChatAPI.markMessageAsRead(message._id);
    } else {
      // Update conversation list with new message
      setConversations(prev => 
        prev.map(conv => 
          conv._id === message.chatId 
            ? { 
                ...conv, 
                lastMessage: {
                  message: message.content || 'Attachment',
                  sentAt: message.createdAt
                },
                unreadCount: (conv.unreadCount || 0) + 1
              } 
            : conv
        )
      );

      // Show notification
      const chat = conversations.find(c => c._id === message.chatId);
      if (chat) {
        notificationService.showNewMessageNotification(message, {
          carOwnerName: `${chat.otherParticipant.firstName} ${chat.otherParticipant.lastName}`,
          avatar: chat.otherParticipant.profileImage
        });
      }
    }
  };

  const handleUserOnline = (userId) => {
    setOnlineUsers(prev => new Set(prev).add(userId));
  };

  const handleUserOffline = (userId) => {
    setOnlineUsers(prev => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  };

  const handleTypingStart = (data) => {
    if (selectedChat && data.chatId === selectedChat._id) {
      setTypingUsers(prev => new Map(prev).set(data.userId, data.userName));
      
      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Auto remove typing indicator after 3 seconds
      typingTimeoutRef.current = setTimeout(() => {
        handleTypingStop(data);
      }, 3000);
    }
  };

  const handleTypingStop = (data) => {
    setTypingUsers(prev => {
      const newMap = new Map(prev);
      newMap.delete(data.userId);
      return newMap;
    });
  };

  const handleMessageRead = (data) => {
    // Update message status in current chat
    if (selectedChat && data.chatId === selectedChat._id) {
      setMessages(prev => 
        prev.map(msg => 
          data.messageIds.includes(msg._id) 
            ? { ...msg, status: 'read', readBy: data.readBy }
            : msg
        )
      );
    }
  };

  const loadChats = async () => {
    try {
      setLoading(true);
      const response = await mechanicChatAPI.getMechanicChats();
      setConversations(response.data.chats || []);
    } catch (error) {
      console.error("Error loading chats:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await mechanicChatAPI.getUnreadNotifications();
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const loadMessages = async (chatId) => {
    try {
      const response = await mechanicChatAPI.getChatMessages(chatId);
      setMessages(response.data.messages || []);
      
      // Mark all messages as read when opening chat
      await mechanicChatAPI.markAllMessagesAsRead(chatId);
      
      // Update unread count in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv._id === chatId ? { ...conv, unreadCount: 0 } : conv
        )
      );

      // Join chat room for real-time updates
      socketService.joinChat(chatId);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    setShowSidebar(false);
    await loadMessages(chat._id);
  };

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || sending) return;

    try {
      setSending(true);
      
      let uploadedAttachments = [];
      if (attachments.length > 0) {
        const uploadResponse = await mechanicChatAPI.uploadAttachments(attachments);
        uploadedAttachments = uploadResponse.data.attachments || [];
      }

      const messageData = {
        content: input.trim(),
        messageType: attachments.length > 0 ? 'file' : 'text',
        attachments: uploadedAttachments
      };

      const response = await mechanicChatAPI.sendMessage(selectedChat._id, messageData);
      const newMessage = response.data;

      // Add message to UI immediately
      setMessages(prev => [...prev, newMessage]);
      setInput("");
      setAttachments([]);
      
      // Update last message in conversations
      setConversations(prev =>
        prev.map(conv =>
          conv._id === selectedChat._id
            ? { 
                ...conv, 
                lastMessage: {
                  message: input || 'Attachment',
                  sentAt: new Date()
                }
              }
            : conv
        )
      );

      // Send typing stop event
      socketService.sendMessage({
        type: 'typing_stop',
        chatId: selectedChat._id,
        userId: user.id
      });

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleTyping = () => {
    if (selectedChat && input.trim()) {
      socketService.sendMessage({
        type: 'typing_start',
        chatId: selectedChat._id,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
    e.target.value = "";
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await mechanicChatAPI.markNotificationAsRead(notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await mechanicChatAPI.markAllNotificationsAsRead();
      setNotifications([]);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const filteredConversations = conversations.filter(chat =>
    chat.otherParticipant?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    chat.otherParticipant?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    chat.jobOrder?.orderId?.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      setTimeout(() => {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  const typingUsersArray = Array.from(typingUsers.values());
  const isCarOwnerOnline = selectedChat && onlineUsers.has(selectedChat.otherParticipant.userId);

  return (
    <div className="mechanic-chat-wrapper">
      {/* Sidebar */}
      <div className={`chat-sidebar ${showSidebar ? "visible" : "hidden-mobile"}`}>
        <div className="chat-header">
          <button className="back-btn" onClick={() => navigate("/mechanic/dashboard")}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h3>Messages</h3>
          {notifications.length > 0 && (
            <button 
              className="notifications-btn"
              onClick={markAllNotificationsAsRead}
              title="Mark all as read"
            >
              <i className="fas fa-bell"></i>
              <span className="notification-count">{notifications.length}</span>
            </button>
          )}
        </div>

        <div className="chat-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Notifications Panel */}
        {notifications.length > 0 && (
          <div className="notifications-panel">
            <div className="notifications-header">
              <span>Notifications</span>
              <button onClick={markAllNotificationsAsRead}>Clear All</button>
            </div>
            {notifications.map(notification => (
              <div key={notification._id} className="notification-item">
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <button 
                  onClick={() => markNotificationAsRead(notification._id)}
                  className="mark-read-btn"
                >
                  <i className="fas fa-check"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="chat-list">
          {loading ? (
            <div className="loading">Loading conversations...</div>
          ) : filteredConversations.length === 0 ? (
            <div className="no-chats">No conversations found</div>
          ) : (
            filteredConversations.map(chat => (
              <div
                key={chat._id}
                className={`chat-item ${selectedChat?._id === chat._id ? "active" : ""}`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="chat-avatar-container">
                  <img
                    src={chat.otherParticipant?.profileImage || "https://via.placeholder.com/40"}
                    alt={chat.otherParticipant?.firstName}
                    className="chat-avatar"
                  />
                  {onlineUsers.has(chat.otherParticipant.userId) && (
                    <div className="online-indicator"></div>
                  )}
                </div>
                <div className="chat-info">
                  <h4>
                    {chat.otherParticipant?.firstName} {chat.otherParticipant?.lastName}
                    {chat.jobOrder && <span className="job-badge">#{chat.jobOrder.orderId}</span>}
                  </h4>
                  <p className="last-message">
                    {chat.lastMessage?.message || "No messages yet"}
                  </p>
                  <span className="last-time">
                    {chat.lastMessage?.sentAt ? 
                      new Date(chat.lastMessage.sentAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      }) : 
                      "New"
                    }
                  </span>
                </div>
                {chat.unreadCount > 0 && (
                  <span className="unread-badge">{chat.unreadCount}</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Main Area */}
      <div className={`chat-main ${showSidebar ? "hidden-mobile" : "visible"}`}>
        {selectedChat ? (
          <>
            <div className="chat-header-main">
              <button 
                className="back-btn-mobile"
                onClick={() => setShowSidebar(true)}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <div className="chat-avatar-container">
                <img
                  src={selectedChat.otherParticipant?.profileImage || "https://via.placeholder.com/40"}
                  alt={selectedChat.otherParticipant?.firstName}
                  className="chat-avatar"
                />
                {isCarOwnerOnline && <div className="online-indicator"></div>}
              </div>
              <div className="chat-partner-info">
                <h4>
                  {selectedChat.otherParticipant?.firstName} {selectedChat.otherParticipant?.lastName}
                  {selectedChat.jobOrder && (
                    <span className="job-badge">#{selectedChat.jobOrder.orderId}</span>
                  )}
                </h4>
                <p className="partner-status">
                  {isCarOwnerOnline ? (
                    <span className="online-text">Online</span>
                  ) : (
                    <span className="offline-text">Offline</span>
                  )}
                  <span className="partner-phone">
                    <i className="fas fa-phone"></i> {selectedChat.otherParticipant?.phone}
                  </span>
                </p>
              </div>
              <div className="chat-actions">
                <button className="call-btn" title="Call">
                  <i className="fas fa-phone"></i>
                </button>
                <button className="info-btn" title="Info">
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>
            </div>

            <div className="chat-messages" ref={chatBodyRef}>
              {messages.map(message => (
                <div
                  key={message._id}
                  className={`message ${message.sender.role === 'mechanic' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    {message.content && <p>{message.content}</p>}
                    {message.attachments && message.attachments.map((attachment, index) => (
                      <div key={index} className="attachment">
                        {attachment.mimetype.startsWith('image/') ? (
                          <img src={attachment.url} alt="Attachment" />
                        ) : (
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-file"></i> {attachment.originalName}
                          </a>
                        )}
                      </div>
                    ))}
                    <div className="message-footer">
                      <span className="message-time">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {message.sender.role === 'mechanic' && (
                        <span className="message-status">
                          {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {typingUsersArray.length > 0 && (
                <div className="typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="typing-text">
                    {typingUsersArray.join(', ')} {typingUsersArray.length === 1 ? 'is' : 'are'} typing...
                  </span>
                </div>
              )}
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="attachments-preview">
                {attachments.map((file, index) => (
                  <div key={index} className="attachment-preview">
                    <i className={`fas ${file.type.startsWith('image/') ? 'fa-image' : 'fa-file'}`}></i>
                    <span>{file.name}</span>
                    <button onClick={() => removeAttachment(index)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="chat-input-area">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                onChange={handleFileChange}
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              />
              <button
                className="attach-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="fas fa-paperclip"></i>
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  handleTyping();
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={sending}
              />
              <button
                className="send-btn"
                onClick={handleSend}
                disabled={sending || (!input.trim() && attachments.length === 0)}
              >
                {sending ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <i className="fas fa-comments"></i>
            <p>Select a conversation to start messaging</p>
            <small>Real-time messaging is enabled</small>
          </div>
        )}
      </div>
    </div>
  );
}