import React from "react";
import { HISTORY } from "../../features/reviewer/mockData";

const History = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Review History</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Student</th>
                            <th className="px-6 py-3">Project</th>
                            <th className="px-6 py-3">Score</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {HISTORY.map(h => (
                            <tr key={h.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-slate-600">{h.date}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{h.student}</td>
                                <td className="px-6 py-4 text-slate-600">{h.project}</td>
                                <td className="px-6 py-4 font-bold text-slate-900">{h.score}/100</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">{h.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default History;
