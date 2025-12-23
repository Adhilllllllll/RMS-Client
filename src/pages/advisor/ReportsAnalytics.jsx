import React from "react";
import { ANALYTICS } from "../../features/advisor/mockData";

const ReportsAnalytics = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase">Total Students</div>
                    <div className="text-3xl font-bold text-slate-900 mt-2">{ANALYTICS.totalStudents}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase">Avg Progress</div>
                    <div className="text-3xl font-bold text-green-600 mt-2">{ANALYTICS.avgProgress}%</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase">Reviews (Week)</div>
                    <div className="text-3xl font-bold text-blue-600 mt-2">{ANALYTICS.reviewsThisWeek}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase">Pending Scores</div>
                    <div className="text-3xl font-bold text-amber-500 mt-2">{ANALYTICS.pendingScores}</div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center text-slate-400">
                Chart visualizations would go here.
            </div>
        </div>
    );
};
export default ReportsAnalytics;
