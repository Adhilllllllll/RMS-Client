import React from "react";
import { SCHEDULE } from "../../features/advisor/mockData";

const Calendar = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Schedule</h2>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50">Day</button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Week</button>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50">Month</button>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[500px]">
                <div className="space-y-4">
                    {SCHEDULE.map(s => (
                        <div key={s.id} className="flex gap-4 p-4 border rounded-lg bg-slate-50 border-slate-200">
                            <div className="text-center min-w-[60px]">
                                <div className="text-sm font-bold text-slate-500">{s.date}</div>
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{s.title}</div>
                                <div className="text-sm text-slate-500 capitalize">{s.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Calendar;
