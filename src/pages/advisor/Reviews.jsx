import React from "react";
import { REVIEWS } from "../../features/advisor/mockData";

const Reviews = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Advisor Reviews</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Student</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {REVIEWS.map(r => (
                            <tr key={r.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{r.date}</div>
                                    <div className="text-xs text-slate-500">{r.time}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{r.student}</td>
                                <td className="px-6 py-4 text-slate-900">{r.type}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">{r.status}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-sm text-green-600 hover:text-green-800 font-medium">Details</button>
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
