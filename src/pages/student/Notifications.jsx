import React from "react";
import { NOTIFICATIONS } from "../../features/student/mockData";

const Notifications = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {NOTIFICATIONS.map(n => (
                        <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors flex gap-4">
                            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.type === 'success' ? 'bg-green-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                                <p className="text-slate-600 text-sm mt-1">{n.message}</p>
                                <p className="text-xs text-slate-400 mt-2">{n.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Notifications;
