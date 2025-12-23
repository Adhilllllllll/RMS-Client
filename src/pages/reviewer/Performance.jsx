import React from "react";
import { PERFORMANCE } from "../../features/reviewer/mockData";

const Performance = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Performance Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase">Total Reviews</div>
                    <div className="text-3xl font-bold text-slate-900 mt-2">{PERFORMANCE.totalReviews}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase">Average Score Given</div>
                    <div className="text-3xl font-bold text-purple-600 mt-2">{PERFORMANCE.avgScore}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-slate-500 text-sm font-medium uppercase">On-Time Completion</div>
                    <div className="text-3xl font-bold text-green-600 mt-2">{PERFORMANCE.onTime}</div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Latest Feedback</h3>
                <p className="text-slate-600 italic">"{PERFORMANCE.feedback}"</p>
                <div className="mt-4 text-sm text-slate-400">- Senior Reviewer</div>
            </div>
        </div>
    );
};
export default Performance;
