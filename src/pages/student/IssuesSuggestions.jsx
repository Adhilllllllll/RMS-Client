import React from "react";

const IssuesSuggestions = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Issues & Suggestions</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-2xl">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                        <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Brief summary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none h-32" placeholder="Describe your issue or suggestion..."></textarea>
                    </div>
                    <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Submit Report</button>
                </form>
            </div>
        </div>
    );
};
export default IssuesSuggestions;
