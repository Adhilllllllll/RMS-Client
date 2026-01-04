import { io } from "socket.io-client";

// Socket instance
let socket = null;

// Server URL
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Initialize socket connection with JWT token
 */
export const initializeSocket = (token) => {
    if (socket?.connected) {
        console.log("Socket already connected");
        return socket;
    }

    socket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    // Connection events
    socket.on("connect", () => {
        console.log("🔌 Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
        console.log("❌ Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
    });

    // ========== NOTIFICATION EVENTS ==========
    socket.on("notification:new", (notification) => {
        console.log("🔔 New notification:", notification);
        // Dispatch to Redux or handle in component
        window.dispatchEvent(
            new CustomEvent("socket:notification", { detail: notification })
        );
    });

    socket.on("notification:pending", ({ count, notifications }) => {
        console.log(`📬 ${count} pending notifications`);
        window.dispatchEvent(
            new CustomEvent("socket:pendingNotifications", { detail: notifications })
        );
    });

    // ========== CHAT EVENTS ==========
    socket.on("chat:receive", (message) => {
        console.log("💬 New message:", message);
        window.dispatchEvent(
            new CustomEvent("socket:chatMessage", { detail: message })
        );
    });

    socket.on("chat:newMessage", ({ conversationId, message }) => {
        console.log("📨 New conversation message:", conversationId);
        window.dispatchEvent(
            new CustomEvent("socket:newConversationMessage", {
                detail: { conversationId, message },
            })
        );
    });

    socket.on("chat:error", ({ message }) => {
        console.error("Chat error:", message);
    });

    // ========== REVIEW CHAT EVENTS ==========
    socket.on("reviewChat:receive", (message) => {
        console.log("📋 Review chat message:", message);
        window.dispatchEvent(
            new CustomEvent("socket:reviewChatMessage", { detail: message })
        );
    });

    socket.on("reviewChat:newMessage", ({ reviewSessionId, message }) => {
        console.log("📋 New review message:", reviewSessionId);
        window.dispatchEvent(
            new CustomEvent("socket:newReviewMessage", {
                detail: { reviewSessionId, message },
            })
        );
    });

    return socket;
};

/**
 * Get current socket instance
 */
export const getSocket = () => socket;

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log("Socket disconnected manually");
    }
};

// ========== CHAT ACTIONS ==========

/**
 * Join a conversation room
 */
export const joinConversation = (conversationId) => {
    if (socket?.connected) {
        socket.emit("chat:join", { conversationId });
    }
};

/**
 * Leave a conversation room
 */
export const leaveConversation = (conversationId) => {
    if (socket?.connected) {
        socket.emit("chat:leave", { conversationId });
    }
};

/**
 * Send a chat message
 */
export const sendChatMessage = (conversationId, content) => {
    if (socket?.connected) {
        socket.emit("chat:send", { conversationId, content });
    }
};

/**
 * Mark messages as read
 */
export const markChatRead = (conversationId) => {
    if (socket?.connected) {
        socket.emit("chat:markRead", { conversationId });
    }
};

// ========== REVIEW CHAT ACTIONS ==========

/**
 * Join a review session chat
 */
export const joinReviewChat = (reviewSessionId) => {
    if (socket?.connected) {
        socket.emit("reviewChat:join", { reviewSessionId });
    }
};

/**
 * Leave a review session chat
 */
export const leaveReviewChat = (reviewSessionId) => {
    if (socket?.connected) {
        socket.emit("reviewChat:leave", { reviewSessionId });
    }
};

/**
 * Send a review chat message
 */
export const sendReviewMessage = (reviewSessionId, content) => {
    if (socket?.connected) {
        socket.emit("reviewChat:send", { reviewSessionId, content });
    }
};

// ========== NOTIFICATION ACTIONS ==========

/**
 * Mark notification as read
 */
export const markNotificationRead = (notificationId) => {
    if (socket?.connected) {
        socket.emit("notification:markRead", { notificationId });
    }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsRead = () => {
    if (socket?.connected) {
        socket.emit("notification:markAllRead");
    }
};

/**
 * Get unread notification count
 */
export const getUnreadNotificationCount = () => {
    if (socket?.connected) {
        socket.emit("notification:getUnreadCount");
    }
};

export default {
    initializeSocket,
    getSocket,
    disconnectSocket,
    // Chat
    joinConversation,
    leaveConversation,
    sendChatMessage,
    markChatRead,
    // Review Chat
    joinReviewChat,
    leaveReviewChat,
    sendReviewMessage,
    // Notifications
    markNotificationRead,
    markAllNotificationsRead,
    getUnreadNotificationCount,
};
