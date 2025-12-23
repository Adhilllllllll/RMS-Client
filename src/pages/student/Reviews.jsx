import React from "react";
import { REVIEWS } from "../../features/student/mockData";

const Reviews = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">My Reviews</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Reviewer</th>
                            <th className="px-6 py-3">Mode</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {REVIEWS.map(r => (
                            <tr key={r.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{r.date}</div>
                                    <div className="text-xs text-slate-500">{r.time}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{r.reviewer}</td>
                                <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">{r.mode}</span></td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                            r.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>{r.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Reviews;
