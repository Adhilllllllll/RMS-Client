import React from "react";

const ReviewerAvailability = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Reviewer Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                            <div>
                                <div className="font-bold text-slate-900">Dr. Smith {i}</div>
                                <div className="text-xs text-slate-500">Senior Reviewer</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-slate-600 flex justify-between">
                                <span>Mon, Wed, Fri</span>
                                <span className="font-medium text-green-600">Available</span>
                            </div>
                            <div className="text-xs text-slate-400">Next Slot: Tomorrow 10:00 AM</div>
                        </div>
                        <button className="w-full mt-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50">View Calendar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ReviewerAvailability;
