import React from "react";
import { MATERIALS } from "../../features/student/mockData";

const StudyMaterials = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Study Materials</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="divide-y divide-slate-100">
                    {MATERIALS.map(m => (
                        <div key={m.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">{m.title}</div>
                                    <div className="text-xs text-slate-500">{m.size} • {m.type}</div>
                                </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default StudyMaterials;
