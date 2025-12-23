import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAvailability } from "../../features/availability/availabilitySlice";
import { REQUESTS, PERFORMANCE } from "../../features/reviewer/mockData";

const ReviewerDashboard = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.availability);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchMyAvailability());
    }, [dispatch]);

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Hello, {user?.name?.split(' ')[0]}!</h1>
                <p className="text-slate-500">Here's your reviewer overview.</p>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Upcoming Reviews</div>
                    <div className="mt-2 text-3xl font-bold text-purple-600">{REQUESTS.length}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Availability Slots</div>
                    <div className="mt-2 text-3xl font-bold text-blue-600">{list?.length || 0}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Reviews Completed</div>
                    <div className="mt-2 text-3xl font-bold text-green-600">{PERFORMANCE.totalReviews}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Avg Score</div>
                    <div className="mt-2 text-3xl font-bold text-amber-500">{PERFORMANCE.avgScore}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* PENDING REQUESTS PREVIEW */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Pending Requests</h3>
                    <div className="space-y-4">
                        {REQUESTS.slice(0, 3).map(r => (
                            <div key={r.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                <div>
                                    <div className="font-medium text-slate-900">{r.student}</div>
                                    <div className="text-xs text-slate-500">{r.project} • {r.date}</div>
                                </div>
                                <button className="text-xs bg-white border border-slate-200 text-purple-600 px-3 py-1 rounded font-medium hover:bg-white hover:text-purple-800">
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Availability Status</h3>
                    {list?.length > 0 ? (
                        <div className="space-y-2">
                            {list.slice(0, 3).map((slot, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>{slot.day}: {slot.startTime} - {slot.endTime}</span>
                                </div>
                            ))}
                            {list.length > 3 && <div className="text-xs text-slate-400 mt-2">+{list.length - 3} more slots</div>}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">No availability set.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ReviewerDashboard;
