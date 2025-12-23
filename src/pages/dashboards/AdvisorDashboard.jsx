import React from "react";
import { useSelector } from "react-redux";
import { STUDENTS, ANALYTICS } from "../../features/advisor/mockData";

const AdvisorDashboard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                <p className="text-slate-500">Here's your advisor overview.</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Students</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900">{ANALYTICS.totalStudents}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Avg Progress</div>
                    <div className="mt-2 text-3xl font-bold text-green-600">{ANALYTICS.avgProgress}%</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Reviews (Week)</div>
                    <div className="mt-2 text-3xl font-bold text-blue-600">{ANALYTICS.reviewsThisWeek}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">Pending Scores</div>
                    <div className="mt-2 text-3xl font-bold text-amber-500">{ANALYTICS.pendingScores}</div>
                </div>
            </div>

            {/* PREVIEWS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900">Assigned Students</h3>
                        <span className="text-xs text-green-600 font-medium cursor-pointer hover:underline">View All</span>
                    </div>
                    <div className="space-y-4">
                        {STUDENTS.slice(0, 3).map(s => (
                            <div key={s.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                <div>
                                    <div className="font-medium text-slate-900">{s.name}</div>
                                    <div className="text-xs text-slate-500">{s.project}</div>
                                </div>
                                <div className="w-16 bg-slate-200 rounded-full h-1.5">
                                    <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${s.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg text-center cursor-pointer hover:bg-green-100 transition-colors">
                            <span className="text-2xl">📅</span>
                            <div className="text-sm font-bold text-green-800 mt-2">View Calendar</div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg text-center cursor-pointer hover:bg-blue-100 transition-colors">
                            <span className="text-2xl">📝</span>
                            <div className="text-sm font-bold text-blue-800 mt-2">New Note</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdvisorDashboard;
