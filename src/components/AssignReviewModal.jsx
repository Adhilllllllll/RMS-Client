import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssignedStudents } from "../features/advisor/advisorSlice";

/**
 * AssignReviewModal - Modal for assigning a review to a student
 */
const AssignReviewModal = ({ isOpen, onClose, onSubmit, isLoading, preselectedReviewer = null }) => {
    const dispatch = useDispatch();
    const { students, reviewers } = useSelector((state) => state.advisor);

    const [formData, setFormData] = useState({
        studentId: "",
        reviewerId: preselectedReviewer?.id || "",
        date: "",
        time: "",
        mode: "online",
        week: 1,
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchAssignedStudents());
            if (preselectedReviewer) {
                setFormData(prev => ({ ...prev, reviewerId: preselectedReviewer.id }));
            }
        }
        if (!isOpen) {
            setFormData({
                studentId: "",
                reviewerId: preselectedReviewer?.id || "",
                date: "",
                time: "",
                mode: "online",
                week: 1,
            });
            setError("");
        }
    }, [isOpen, dispatch, preselectedReviewer]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!formData.studentId || !formData.reviewerId || !formData.date || !formData.time) {
            setError("Please fill all required fields");
            return;
        }

        const scheduledAt = new Date(`${formData.date}T${formData.time}`);
        if (scheduledAt <= new Date()) {
            setError("Please select a future date and time");
            return;
        }

        onSubmit({
            studentId: formData.studentId,
            reviewerId: formData.reviewerId,
            scheduledAt: scheduledAt.toISOString(),
            mode: formData.mode,
            week: parseInt(formData.week),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Assign Review</h3>
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
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Student Select */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Student <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            disabled={isLoading}
                        >
                            <option value="">Select a student</option>
                            {students.map(student => (
                                <option key={student.id} value={student.id}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Reviewer Select */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Reviewer <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="reviewerId"
                            value={formData.reviewerId}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            disabled={isLoading}
                        >
                            <option value="">Select a reviewer</option>
                            {reviewers.filter(r => r.status === "Available").map(reviewer => (
                                <option key={reviewer.id} value={reviewer.id}>
                                    {reviewer.name} ({reviewer.title})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Week Number */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Week Number
                        </label>
                        <input
                            type="number"
                            name="week"
                            value={formData.week}
                            onChange={handleChange}
                            min={1}
                            max={52}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Mode */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Mode
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="mode"
                                    value="online"
                                    checked={formData.mode === "online"}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                                    disabled={isLoading}
                                />
                                <span className="text-sm text-slate-700">Online</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="mode"
                                    value="offline"
                                    checked={formData.mode === "offline"}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                                    disabled={isLoading}
                                />
                                <span className="text-sm text-slate-700">Offline</span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-3">
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
                            className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Assigning...
                                </>
                            ) : (
                                "Assign Review"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignReviewModal;
