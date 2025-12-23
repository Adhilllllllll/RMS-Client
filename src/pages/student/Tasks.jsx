import React from "react";
import { TASKS } from "../../features/student/mockData";

const Tasks = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">My Tasks</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">+ Add Task</button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
                {TASKS.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" checked={t.status === 'Done'} className="rounded text-blue-600 w-4 h-4" readOnly />
                            <span className={t.status === 'Done' ? 'line-through text-slate-400' : 'text-slate-900 font-medium'}>{t.title}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded border ${t.due === 'Tomorrow' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-white text-slate-500 border-slate-200'}`}>Due: {t.due}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Tasks;
