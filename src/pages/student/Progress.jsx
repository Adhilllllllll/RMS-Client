import React from "react";

const Progress = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Academic Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Project Completion</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">75%</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Course Progress</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">40%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Progress;
