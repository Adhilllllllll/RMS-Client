import React from "react";

const Chat = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Chat with Advisor</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-[500px] flex flex-col">
                <div className="p-4 border-b border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">DA</div>
                    <div>
                        <div className="font-bold text-slate-900">Dr. Sarah Wilson</div>
                        <div className="text-xs text-green-600 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Online</div>
                    </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
                    <div className="flex justify-end">
                        <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none text-sm max-w-xs">
                            Hi Professor, I have a question about the abstract submission.
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-white text-slate-700 border border-slate-200 p-3 rounded-lg rounded-tl-none text-sm max-w-xs">
                            Sure, go ahead.
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-200 flex gap-2">
                    <input type="text" className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Type a message..." />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Send</button>
                </div>
            </div>
        </div>
    );
};
export default Chat;
