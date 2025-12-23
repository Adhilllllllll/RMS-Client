import React from "react";
import { useSelector } from "react-redux";
import { REVIEWS, NOTIFICATIONS } from "../../features/student/mockData";

const StudentDashboard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                <p className="text-slate-500">Here's your overview for today.</p>
            </div>

            {/* OVERVIEW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 uppercase">Upcoming Reviews</h3>
                    <div className="mt-4 space-y-4">
                        {REVIEWS.slice(0, 2).map(r => (
                            <div key={r.id} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex flex-col items-center justify-center text-xs font-bold leading-none">
                                    <span>{r.date.split(' ')[0]}</span>
                                    <span>{r.date.split(',')[0].split(' ')[1]}</span>
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900 text-sm">{r.reviewer}</div>
                                    <div className="text-xs text-slate-500">{r.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 uppercase">Notifications</h3>
                    <div className="mt-4 space-y-3">
                        {NOTIFICATIONS.slice(0, 3).map(n => (
                            <div key={n.id} className="flex items-start gap-2">
                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                <p className="text-sm text-slate-600 line-clamp-2">{n.message}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 uppercase">Progress Summary</h3>
                    <div className="mt-6">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-slate-700">Project Completion</span>
                            <span className="font-bold text-blue-600">75%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">You are on track to complete your milestones.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentDashboard;
