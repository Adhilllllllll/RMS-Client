import React, { useState, useEffect } from "react";

/**
 * RescheduleReviewModal - Modal for rescheduling a review
 * Matches Figma design
 */
const RescheduleReviewModal = ({ isOpen, onClose, review, onSubmit, isLoading }) => {
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [notify, setNotify] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen && review?.scheduledAt) {
            const date = new Date(review.scheduledAt);
            setNewDate(date.toISOString().split('T')[0]);
            setNewTime(date.toTimeString().slice(0, 5));
        }
        if (!isOpen) {
            setError("");
        }
    }, [isOpen, review]);

    if (!isOpen || !review) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!newDate || !newTime) {
            setError("Please select both date and time");
            return;
        }

        const scheduledAt = new Date(`${newDate}T${newTime}`);
        if (scheduledAt <= new Date()) {
            setError("Please select a future date and time");
            return;
        }

        onSubmit({
            scheduledAt: scheduledAt.toISOString(),
            notifyParticipants: notify,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Reschedule Review</h3>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Review Info */}
                    <p className="text-sm text-slate-600">
                        Reschedule review for <span className="font-semibold text-slate-900">{review.student}</span> with <span className="font-semibold text-blue-600">{review.reviewer}</span>
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Date Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            New Date
                        </label>
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Time Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            New Time
                        </label>
                        <input
                            type="time"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Notify Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notify}
                            onChange={(e) => setNotify(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <span className="text-sm text-slate-700">Notify student and reviewer</span>
                    </label>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Rescheduling...
                                </>
                            ) : (
                                "Reschedule"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RescheduleReviewModal;
