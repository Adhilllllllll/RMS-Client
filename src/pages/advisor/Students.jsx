import React from "react";
import { STUDENTS } from "../../features/advisor/mockData";

const Students = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">My Students</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3">Student</th>
                            <th className="px-6 py-3">Project</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Progress</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {STUDENTS.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{s.name}</td>
                                <td className="px-6 py-4 text-slate-600">{s.project}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            s.status === 'Review' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                        }`}>{s.status}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-24 bg-slate-200 rounded-full h-1.5">
                                        <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${s.progress}%` }}></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-sm text-green-600 hover:text-green-800 font-medium">View Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Students;
