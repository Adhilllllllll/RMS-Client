import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotifications,
    markNotificationRead,
    markAllNotificationsRead,
} from "../../features/student/studentSlice";

/* ============================================
   Notification Type Icons
============================================ */
const NotificationIcon = React.memo(({ type }) => {
    switch (type) {
        case "review_reminder":
        case "review_scheduled":
            return (
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            );
        case "feedback_available":
            return (
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                </div>
            );
        case "new_message":
            return (
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
            );
        case "task_deadline":
        case "task_assigned":
            return (
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            );
        case "review_completed":
        case "success":
            return (
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            );
        default:
            return (
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
            );
    }
});

NotificationIcon.displayName = "NotificationIcon";

/* ============================================
   Time Formatter
============================================ */
const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
        return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays === 1) {
        return "Yesterday";
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    }
};

/* ============================================
   Skeleton Loader
============================================ */
const SkeletonNotification = () => (
    <div className="p-4 flex items-start gap-4 animate-pulse">
        <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
        <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-64 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-20"></div>
        </div>
    </div>
);

/* ============================================
   Notification Item Component
============================================ */
const NotificationItem = React.memo(({ notification, onMarkAsRead }) => {
    const isUnread = !notification.isRead;

    return (
        <div
            className={`flex items-start gap-4 p-4 transition-colors ${isUnread
                    ? "bg-orange-50 border-l-4 border-orange-500"
                    : "hover:bg-slate-50"
                }`}
        >
            <NotificationIcon type={notification.type} />
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h4 className="font-semibold text-slate-900">{notification.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-400 mt-2">
                            {formatTimeAgo(notification.createdAt)}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {isUnread && (
                            <>
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                <button
                                    onClick={() => onMarkAsRead(notification.id)}
                                    className="text-xs text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap"
                                >
                                    Mark as read
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

NotificationItem.displayName = "NotificationItem";

/* ============================================
   Main Notifications Component
============================================ */
const Notifications = () => {
    const dispatch = useDispatch();
    const {
        notifications,
        unreadCount,
        notificationsLoading,
        error,
    } = useSelector((state) => state.student);

    // Fetch notifications on mount
    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    // Handlers
    const handleMarkAsRead = useCallback((notificationId) => {
        dispatch(markNotificationRead(notificationId));
    }, [dispatch]);

    const handleMarkAllAsRead = useCallback(() => {
        dispatch(markAllNotificationsRead());
    }, [dispatch]);

    // Subtitle text
    const subtitleText = useMemo(() => {
        if (unreadCount === 0) {
            return "No unread notifications";
        } else if (unreadCount === 1) {
            return "You have 1 unread notification";
        } else {
            return `You have ${unreadCount} unread notifications`;
        }
    }, [unreadCount]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
                    <p className="text-slate-500">{subtitleText}</p>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Notifications List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {notificationsLoading ? (
                    <div className="divide-y divide-slate-100">
                        <SkeletonNotification />
                        <SkeletonNotification />
                        <SkeletonNotification />
                        <SkeletonNotification />
                    </div>
                ) : notifications.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={handleMarkAsRead}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <svg className="w-12 h-12 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <p className="text-slate-500">No notifications yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
