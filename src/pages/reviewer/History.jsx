import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchReviewerReviews,
    fetchSingleReview,
    clearSelectedReview,
} from "../../features/reviewer/reviewerSlice";

// Debounce hook for search optimization
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

// Format date for display
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const History = () => {
    const dispatch = useDispatch();
    const { reviews, selectedReview, loading, error } = useSelector((state) => state.reviewer);

    // Local state
    const [searchQuery, setSearchQuery] = useState("");
    const [domainFilter, setDomainFilter] = useState("");
    const [viewModalOpen, setViewModalOpen] = useState(false);

    // Debounced search
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Fetch reviews on mount
    useEffect(() => {
        dispatch(fetchReviewerReviews());
    }, [dispatch]);

    // Filter completed reviews only
    const completedReviews = useMemo(() => {
        return reviews.filter(r => r.status === "completed");
    }, [reviews]);

    // Get unique domains for filter dropdown
    const availableDomains = useMemo(() => {
        const domains = completedReviews
            .map(r => r.advisor?.domain || "General")
            .filter((v, i, arr) => arr.indexOf(v) === i);
        return domains.sort();
    }, [completedReviews]);

    // Apply search and filters
    const filteredReviews = useMemo(() => {
        let result = completedReviews;

        // Search by student name
        if (debouncedSearch.trim()) {
            const query = debouncedSearch.toLowerCase();
            result = result.filter(r =>
                r.student?.name?.toLowerCase().includes(query)
            );
        }

        // Filter by domain
        if (domainFilter) {
            result = result.filter(r =>
                (r.advisor?.domain || "General") === domainFilter
            );
        }

        return result;
    }, [completedReviews, debouncedSearch, domainFilter]);

    // Handle view review
    const handleView = useCallback((reviewId) => {
        dispatch(fetchSingleReview(reviewId));
        setViewModalOpen(true);
    }, [dispatch]);

    // Close view modal
    const closeViewModal = useCallback(() => {
        setViewModalOpen(false);
        dispatch(clearSelectedReview());
    }, [dispatch]);

    // Get score display (mock for now since score might not be in data)
    const getScore = (review) => {
        return review.score || review.totalScore || "—";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Review History</h2>
                    <p className="text-slate-500">View your completed reviews</p>
                </div>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {completedReviews.length} Completed
                </span>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                    <input
                        type="text"
                        placeholder="Search by student name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                </div>

                {/* Domain Filter */}
                <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                    <option value="">All Domains</option>
                    {availableDomains.map((domain) => (
                        <option key={domain} value={domain}>{domain}</option>
                    ))}
                </select>

                {/* Clear Filters */}
                {(searchQuery || domainFilter) && (
                    <button
                        onClick={() => { setSearchQuery(""); setDomainFilter(""); }}
                        className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading && completedReviews.length === 0 ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredReviews.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No completed reviews</h3>
                        <p className="text-slate-500 text-sm">
                            {searchQuery || domainFilter
                                ? "Try adjusting your filters"
                                : "Completed reviews will appear here"}
                        </p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3">Student</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Domain</th>
                                <th className="px-6 py-3">Score</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredReviews.map((review) => (
                                <tr key={review._id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                                                {review.student?.name?.charAt(0) || "S"}
                                            </div>
                                            <span className="font-medium text-slate-900">
                                                {review.student?.name || "Unknown"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {formatDate(review.scheduledAt)}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {review.advisor?.domain || "General"}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        {getScore(review)}/100
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                            Completed
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleView(review._id)}
                                            className="p-1.5 text-slate-500 hover:text-purple-600 transition-colors"
                                            title="View Details"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* View Review Modal */}
            {viewModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
                        <div className="flex items-center justify-between p-4 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">Review Details</h3>
                            <button onClick={closeViewModal} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : selectedReview ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Student</label>
                                            <p className="font-medium text-slate-900">{selectedReview.student}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Advisor</label>
                                            <p className="font-medium text-slate-900">{selectedReview.advisor}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Domain</label>
                                            <p className="font-medium text-slate-900">{selectedReview.domain}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Week</label>
                                            <p className="font-medium text-slate-900">Week {selectedReview.week}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Date</label>
                                            <p className="font-medium text-slate-900">{formatDate(selectedReview.scheduledAt)}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Status</label>
                                            <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                                                Completed
                                            </span>
                                        </div>
                                    </div>
                                    {selectedReview.feedback && (
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase">Feedback</label>
                                            <p className="text-slate-700 text-sm mt-1 bg-slate-50 p-3 rounded-lg">
                                                {selectedReview.feedback}
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-slate-400 text-center">No data available</p>
                            )}
                        </div>
                        <div className="flex justify-end p-4 border-t border-slate-200">
                            <button onClick={closeViewModal} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
