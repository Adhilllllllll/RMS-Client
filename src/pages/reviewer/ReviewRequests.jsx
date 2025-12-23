import React from "react";
import { REQUESTS } from "../../features/reviewer/mockData";

const ReviewRequests = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Review Requests</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Student</th>
                            <th className="px-6 py-3">Project</th>
                            <th className="px-6 py-3">Requested Time</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {REQUESTS.map(r => (
                            <tr key={r.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{r.student}</td>
                                <td className="px-6 py-4 text-slate-600">{r.project}</td>
                                <td className="px-6 py-4">
                                    <div className="text-slate-900">{r.date}</div>
                                    <div className="text-xs text-slate-500">{r.time}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded hover:bg-purple-700 transition-colors">Accept</button>
                                        <button className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded hover:bg-slate-50 transition-colors">Reschedule</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ReviewRequests;
