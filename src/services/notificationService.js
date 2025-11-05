// services/notificationService.js
class NotificationService {
  constructor() {
    this.permission = null;
    this.notifications = [];
  }

  async requestPermission() {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  showNotification(title, options = {}) {
    if (this.permission !== 'granted') return null;

    const notification = new Notification(title, {
      icon: '/logo.png',
      badge: '/logo.png',
      ...options
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
      
      // Handle notification click (e.g., focus chat window)
      if (options.onClick) {
        options.onClick();
      }
    };

    // Auto close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);

    this.notifications.push(notification);
    return notification;
  }

  showNewMessageNotification(message, chatInfo) {
    const title = `New message from ${chatInfo.carOwnerName}`;
    const body = message.content || 'Sent an attachment';
    
    this.showNotification(title, {
      body: body,
      icon: chatInfo.avatar || '/default-avatar.png',
      tag: `chat-${message.chatId}`,
      onClick: () => {
        // Focus on the chat window
        const event = new CustomEvent('focus-chat', { 
          detail: { chatId: message.chatId } 
        });
        window.dispatchEvent(event);
      }
    });
  }

  showNewChatNotification(chatInfo) {
    const title = 'New chat started';
    const body = `${chatInfo.carOwnerName} started a new conversation`;
    
    this.showNotification(title, {
      body: body,
      icon: chatInfo.avatar || '/default-avatar.png',
      tag: `new-chat-${chatInfo.chatId}`
    });
  }

  clearAll() {
    this.notifications.forEach(notification => notification.close());
    this.notifications = [];
  }
}

export const notificationService = new NotificationService();