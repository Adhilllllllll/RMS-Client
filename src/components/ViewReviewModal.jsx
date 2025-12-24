import React from "react";

/**
 * ViewReviewModal - Read-only modal to display review details
 */
const ViewReviewModal = ({ isOpen, onClose, review }) => {
    if (!isOpen || !review) return null;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "scheduled":
                return "bg-blue-100 text-blue-700";
            case "completed":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-amber-100 text-amber-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop - softer overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700">
                    <h3 className="text-lg font-bold text-white">Review Details</h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    {/* Student & Reviewer */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Student</div>
                            <div className="font-semibold text-slate-900">{review.student}</div>
                            <div className="text-xs text-slate-500">{review.studentEmail}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Reviewer</div>
                            <div className="font-semibold text-slate-900">{review.reviewer}</div>
                            <div className="text-xs text-slate-500">{review.reviewerEmail}</div>
                        </div>
                    </div>

                    {/* Details Table */}
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b border-slate-100">
                                <td className="py-3 text-slate-500">Date</td>
                                <td className="py-3 text-right font-medium text-slate-900">
                                    {formatDate(review.scheduledAt)}
                                </td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="py-3 text-slate-500">Time</td>
                                <td className="py-3 text-right font-medium text-slate-900">
                                    {formatTime(review.scheduledAt)}
                                </td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="py-3 text-slate-500">Domain</td>
                                <td className="py-3 text-right font-medium text-slate-900">
                                    {review.domain || "General"}
                                </td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="py-3 text-slate-500">Week</td>
                                <td className="py-3 text-right font-medium text-slate-900">
                                    Week {review.week}
                                </td>
                            </tr>
                            <tr className="border-b border-slate-100">
                                <td className="py-3 text-slate-500">Mode</td>
                                <td className="py-3 text-right font-medium text-slate-900 capitalize">
                                    {review.mode}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 text-slate-500">Status</td>
                                <td className="py-3 text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                                        {review.status}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Meeting Link / Location */}
                    {review.meetingLink && (
                        <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-xs text-blue-600 font-medium mb-1">Meeting Link</div>
                            <a href={review.meetingLink} target="_blank" rel="noopener noreferrer"
                                className="text-blue-700 hover:underline text-sm break-all">
                                {review.meetingLink}
                            </a>
                        </div>
                    )}

                    {review.location && (
                        <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-xs text-green-600 font-medium mb-1">Location</div>
                            <div className="text-green-700 text-sm">{review.location}</div>
                        </div>
                    )}

                    {/* Marks & Feedback (if completed) */}
                    {review.status?.toLowerCase() === "completed" && (
                        <div className="bg-green-50 rounded-lg p-4 space-y-2">
                            {review.marks !== undefined && (
                                <div className="flex justify-between">
                                    <span className="text-green-700 font-medium">Marks</span>
                                    <span className="text-green-900 font-bold">{review.marks}/10</span>
                                </div>
                            )}
                            {review.feedback && (
                                <div>
                                    <div className="text-green-700 font-medium text-sm mb-1">Feedback</div>
                                    <div className="text-green-900 text-sm">{review.feedback}</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewReviewModal;
