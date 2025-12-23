import React from "react";

const ReviewSession = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Active Review Session</h2>
                    <p className="text-slate-500">Evaluating: E-Commerce API (Alice Johnson)</p>
                </div>
                <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-bold">Time Remaining: 45:00</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* RUBRIC */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Code Quality Rubric</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Criterion {i}</label>
                                    <input type="range" className="w-full accent-purple-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Feedback</h3>
                        <textarea className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="Detailed feedback..."></textarea>
                    </div>
                </div>

                {/* INFO */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-2">Repository</h3>
                        <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium">github.com/alice/project</a>
                    </div>
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-sm transition-colors">
                        Submit Review
                    </button>
                    <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl transition-colors">
                        Mark as No-Show
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ReviewSession;
