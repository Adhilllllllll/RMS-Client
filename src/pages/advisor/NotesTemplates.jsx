import React from "react";
import { TEMPLATES } from "../../features/advisor/mockData";

const NotesTemplates = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Notes & Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* TEMPLATES */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Saved Templates</h3>
                    <div className="space-y-3">
                        {TEMPLATES.map(t => (
                            <div key={t.id} className="p-3 border border-slate-200 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
                                <div className="font-medium text-slate-900">{t.title}</div>
                                <div className="text-xs text-slate-500">Last used: {t.lastUsed}</div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg text-sm hover:bg-green-100">+ Create Template</button>
                </div>

                {/* QUICK NOTES */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Quick Notes</h3>
                    <textarea className="w-full h-40 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500" placeholder="Type here..."></textarea>
                </div>
            </div>
        </div>
    );
};
export default NotesTemplates;
