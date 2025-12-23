import React from "react";

const MOCK_ACTIVITY = [
    { id: 1, type: "complete", message: "Review for Project Alpha was completed.", time: "2 min ago" },
    { id: 2, type: "add", message: "New advisor Dr. Emily Carter was added.", time: "1 hour ago" },
    { id: 3, type: "pending", message: "A new review request for Project Beta is pending approval.", time: "3 hours ago" },
    { id: 4, type: "register", message: "New student John Doe was registered.", time: "Yesterday" },
];

const RecentActivity = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
                <p className="text-slate-500">Track all system activities and events</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Activity Feed</h3>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Filter</button>
                        <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">Export</button>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    {MOCK_ACTIVITY.map((act) => (
                        <div key={act.id} className="flex gap-4">
                            <div className={`mt-1 flex-shrink-0 w-2.5 h-2.5 rounded-full ${act.type === 'complete' ? 'bg-green-500' :
                                    act.type === 'add' ? 'bg-blue-500' :
                                        act.type === 'pending' ? 'bg-amber-500' : 'bg-slate-400'
                                }`} />
                            <div>
                                <p className="text-sm text-slate-800 leading-snug">{act.message}</p>
                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {act.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
