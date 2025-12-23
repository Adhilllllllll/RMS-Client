import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>

            {/* HEADER CARD */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 border-4 border-white shadow-md">
                        {user?.name?.charAt(0) || "S"}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                </div>
                <div className="text-center md:text-left space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">{user?.name}</h3>
                    <p className="text-slate-500 font-medium">{user?.email}</p>
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {user?.role}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* INFO COLUMN */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></span>
                            Personal Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                                <input type="text" value={user?.name || ""} readOnly className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                                <input type="email" value={user?.email || ""} readOnly className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                                <input type="text" defaultValue="+1 (555) 123-4567" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Student ID</label>
                                <input type="text" value="STU-2024-001" readOnly className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700" />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR COLUMN */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Account Settings</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-between text-sm text-slate-600 cursor-pointer hover:text-blue-600">
                                <span>Change Password</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </li>
                            <li className="flex items-center justify-between text-sm text-slate-600 cursor-pointer hover:text-blue-600">
                                <span>Notification Preferences</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </li>
                            <li className="flex items-center justify-between text-sm text-slate-600 cursor-pointer hover:text-blue-600">
                                <span>Privacy Settings</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
