import React from "react";

const Chat = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Chat</h2>
                <p className="text-slate-500">Communicate with students and reviewers</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
                {/* Contacts List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>
                    <div className="overflow-y-auto h-full">
                        {/* Contact items */}
                        {[
                            { name: "Emma Davis", type: "Student", lastMessage: "Thank you for the feedback!", time: "2m ago", unread: 2 },
                            { name: "Dr. Smith", type: "Reviewer", lastMessage: "The review is scheduled for...", time: "1h ago", unread: 0 },
                            { name: "James Wilson", type: "Student", lastMessage: "Can we reschedule?", time: "3h ago", unread: 1 },
                            { name: "Prof. Johnson", type: "Reviewer", lastMessage: "I've submitted the scores", time: "Yesterday", unread: 0 },
                        ].map((contact, idx) => (
                            <div key={idx} className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${idx === 0 ? 'bg-green-50' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${contact.type === "Student" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"} flex items-center justify-center font-bold text-sm`}>
                                        {contact.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-slate-900">{contact.name}</span>
                                            <span className="text-xs text-slate-400">{contact.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-500 truncate">{contact.lastMessage}</span>
                                            {contact.unread > 0 && (
                                                <span className="bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                    {contact.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                            E
                        </div>
                        <div>
                            <div className="font-medium text-slate-900">Emma Davis</div>
                            <div className="text-xs text-green-600">Online</div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50">
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-lg shadow-sm max-w-[70%]">
                                <p className="text-sm text-slate-700">Hi! I wanted to ask about my upcoming review session.</p>
                                <span className="text-xs text-slate-400 mt-1 block">10:30 AM</span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-green-600 text-white p-3 rounded-lg max-w-[70%]">
                                <p className="text-sm">Sure, what would you like to know?</p>
                                <span className="text-xs text-green-200 mt-1 block">10:32 AM</span>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-lg shadow-sm max-w-[70%]">
                                <p className="text-sm text-slate-700">Thank you for the feedback! I'll work on those areas.</p>
                                <span className="text-xs text-slate-400 mt-1 block">10:35 AM</span>
                            </div>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-slate-100">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
