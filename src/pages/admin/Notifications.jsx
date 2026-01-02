import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const Notifications = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [recipientGroup, setRecipientGroup] = useState("");
    const [sentNotifications, setSentNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Fetch sent notifications on mount
    useEffect(() => {
        fetchSentNotifications();
    }, []);

    const fetchSentNotifications = async () => {
        try {
            setFetchLoading(true);
            const response = await api.get("/notifications/admin/sent");
            setSentNotifications(response.data.notifications || []);
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSendNotification = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title.trim() || !message.trim() || !recipientGroup) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/notifications/admin/send", {
                title: title.trim(),
                message: message.trim(),
                recipientGroup,
            });

            setSuccess(`Notification sent to ${response.data.recipientCount} recipients`);
            setTitle("");
            setMessage("");
            setRecipientGroup("");

            // Refresh the sent notifications list
            fetchSentNotifications();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send notification");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatRecipientGroup = (group) => {
        const groupLabels = {
            students: "Students",
            reviewers: "Reviewers",
            all_users: "All Users",
        };
        return groupLabels[group] || group;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
                <p className="text-slate-500">Create and manage system notifications</p>
            </div>

            {/* Create Notification Form */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    Create & Send Notifications
                </h2>

                <form onSubmit={handleSendNotification} className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter notification title"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write notification message"
                            rows={4}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Send To Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Send To
                        </label>
                        <select
                            value={recipientGroup}
                            onChange={(e) => setRecipientGroup(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-slate-700"
                        >
                            <option value="">Select recipient group</option>
                            <option value="students">Students</option>
                            <option value="reviewers">Reviewers</option>
                            <option value="all_users">All Users</option>
                        </select>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                            {success}
                        </div>
                    )}

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        {loading ? "Sending..." : "Send Notification"}
                    </button>
                </form>
            </div>

            {/* Previously Sent Notifications */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Previously Sent Notifications
                    </h2>
                </div>

                {fetchLoading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : sentNotifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        No notifications sent yet
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                            <tr>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Date Sent</th>
                                <th className="px-6 py-3 text-left">Sent To</th>
                                <th className="px-6 py-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {sentNotifications.map((notification) => (
                                <tr key={notification.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900 text-sm">
                                            {notification.title}
                                        </div>
                                        <div className="text-xs text-slate-500 truncate max-w-xs">
                                            {notification.message}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(notification.dateSent)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                                {formatRecipientGroup(notification.recipientGroup)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${notification.status === "delivered"
                                                ? "bg-green-100 text-green-700"
                                                : notification.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                            {notification.status === "delivered" ? "Delivered" :
                                                notification.status === "pending" ? "Pending" : "Failed"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Notifications;
