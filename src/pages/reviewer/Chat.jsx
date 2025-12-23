import React from "react";

const Chat = () => {
    return (
        <div className="flex h-[calc(100vh-10rem)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* LIST */}
            <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <input type="text" placeholder="Search students..." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`p-4 hover:bg-white cursor-pointer border-l-4 ${i === 1 ? 'border-purple-600 bg-white' : 'border-transparent'}`}>
                            <div className="font-bold text-slate-900">Student {i}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">Can we reschedule?</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WINDOW */}
            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
                    <div className="font-bold text-slate-900">Student 1</div>
                    <div className="text-xs text-green-600 font-medium">Online</div>
                </div>
                <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50">
                    <div className="flex justify-end">
                        <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl rounded-tr-none text-sm max-w-sm">
                            Hi! Are you ready for the review?
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-2xl rounded-tl-none text-sm max-w-sm shadow-sm">
                            Yes, I am just setting up the repo.
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white border-t border-slate-200">
                    <div className="flex gap-2">
                        <input type="text" placeholder="Type a message..." className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500" />
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chat;
