import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewersAvailability, fetchAdvisorReviews } from "../../features/advisor/advisorSlice";
import AssignReviewModal from "../../components/AssignReviewModal";
import api from "../../api/axios";

// Map dayOfWeek numbers to day names
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// Convert 24h time to 12h format
const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};

// Format time range
const formatTimeRange = (startTime, endTime) => {
    if (!startTime || !endTime) return "";
    const [startH] = startTime.split(":");
    const [endH] = endTime.split(":");
    const sH = parseInt(startH, 10);
    const eH = parseInt(endH, 10);
    const ampm = eH >= 12 ? "PM" : "AM";
    return `${sH % 12 || 12}-${eH % 12 || 12} ${ampm}`;
};

// Domain options
const DOMAINS = ["All Domains", "Python", "React", "DataScience", "JavaScript", "Node.js", "General"];

const ReviewerAvailability = () => {
    const dispatch = useDispatch();
    const { reviewers, loading, error } = useSelector((state) => state.advisor);

    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [domainFilter, setDomainFilter] = useState("All Domains");
    const [assignModal, setAssignModal] = useState({ open: false, reviewer: null });
    const [assignLoading, setAssignLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        dispatch(fetchReviewersAvailability());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    // Filter reviewers
    const filteredReviewers = useMemo(() => {
        return reviewers.filter(reviewer => {
            const matchesSearch = reviewer.name?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDomain = domainFilter === "All Domains" ||
                reviewer.title?.includes(domainFilter) ||
                reviewer.domain?.includes(domainFilter);
            return matchesSearch && matchesDomain;
        });
    }, [reviewers, searchQuery, domainFilter]);

    // Group slots by day
    const getSlotsByDay = (slots) => {
        const grouped = { 1: [], 2: [], 3: [], 4: [], 5: [] };
        slots?.forEach(slot => {
            if (slot.dayOfWeek >= 1 && slot.dayOfWeek <= 5) {
                grouped[slot.dayOfWeek].push(slot);
            }
        });
        return grouped;
    };

    // Handlers
    const handleOpenAssignModal = useCallback((reviewer = null) => {
        setAssignModal({ open: true, reviewer });
    }, []);

    const handleCloseAssignModal = useCallback(() => {
        setAssignModal({ open: false, reviewer: null });
    }, []);

    const handleAssignReview = async (data) => {
        setAssignLoading(true);
        try {
            await api.post("/reviews", data);
            setSuccessMessage("Review assigned successfully!");
            handleCloseAssignModal();
            dispatch(fetchReviewersAvailability());
            dispatch(fetchAdvisorReviews());
        } catch (err) {
            console.error("Assign review error:", err);
        } finally {
            setAssignLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Reviewer Availability</h2>
                <p className="text-slate-500">Check reviewer schedules and assign reviews</p>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {successMessage}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Search and Filter */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search reviewers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-w-32"
                >
                    {DOMAINS.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>
                    ))}
                </select>
            </div>

            {/* Reviewers List */}
            {loading.reviewers ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : filteredReviewers.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center text-slate-400">
                    {searchQuery || domainFilter !== "All Domains"
                        ? "No reviewers match your filters"
                        : "No reviewers found"}
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredReviewers.map(reviewer => {
                        const slotsByDay = getSlotsByDay(reviewer.slots);

                        return (
                            <div key={reviewer.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                {/* Reviewer Header */}
                                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                                            {reviewer.name?.charAt(0) || "R"}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{reviewer.name}</div>
                                            <div className="text-sm text-slate-500">Domain: {reviewer.title}</div>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-sm font-medium ${reviewer.status === 'Available'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {reviewer.status}
                                    </span>
                                </div>

                                {/* Weekly Availability Grid */}
                                <div className="p-4">
                                    <div className="text-sm font-medium text-slate-700 mb-3">Weekly Availability</div>
                                    <div className="grid grid-cols-5 gap-3">
                                        {WEEKDAYS.map((day, idx) => {
                                            const dayNum = idx + 1;
                                            const daySlots = slotsByDay[dayNum] || [];

                                            return (
                                                <div key={day} className="bg-slate-50 rounded-lg p-3 min-h-24">
                                                    <div className="text-xs font-semibold text-slate-600 mb-2">{day}</div>
                                                    <div className="space-y-1">
                                                        {daySlots.length > 0 ? (
                                                            daySlots.map((slot, i) => (
                                                                <div key={i} className="flex items-center gap-1 text-xs text-green-700">
                                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    {formatTimeRange(slot.startTime, slot.endTime)}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs text-slate-400">—</span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Assign Button */}
                                <div className="px-4 pb-4">
                                    <button
                                        onClick={() => handleOpenAssignModal(reviewer)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                    >
                                        Assign Review
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Assign Review Modal */}
            <AssignReviewModal
                isOpen={assignModal.open}
                onClose={handleCloseAssignModal}
                onSubmit={handleAssignReview}
                isLoading={assignLoading}
                preselectedReviewer={assignModal.reviewer}
            />
        </div>
    );
};

export default ReviewerAvailability;
