import React, { useState } from "react";

const MOCK_USERS = [
    { id: 1, name: "Dr. Olivia Rhye", email: "olivia.rhye@university.edu", role: "Advisor", domain: "Python", status: "Active", image: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Dr. Lana Steiner", email: "lana.steiner@university.edu", role: "Advisor", domain: "DataScience", status: "Inactive", image: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Prof. Phoenix Baker", email: "phoenix.baker@university.edu", role: "Advisor", domain: "ReactJS", status: "Active", image: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Demi Wilkinson", email: "demi@student.edu", role: "Student", domain: "Frontend", status: "Active", image: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Candice Wu", email: "candice@reviewer.edu", role: "Reviewer", domain: "Backend", status: "Active", image: "https://i.pravatar.cc/150?u=5" },
];

const ManageUsers = () => {
    const [activeTab, setActiveTab] = useState("Advisors");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Manage Users</h2>
                    <p className="text-slate-500">Add, edit, and manage system users</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Bulk Import</button>
                    <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 shadow-sm">+ Add New User</button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {/* TABS */}
                <div className="flex border-b border-slate-200 px-6 pt-2">
                    {["Advisors", "Reviewers", "Students"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`mr-8 pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* FILTERS */}
                <div className="p-4 border-b border-slate-200 flex gap-4 bg-slate-50">
                    <input className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="Search by name or email..." />
                    <select className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600"><option>Role</option></select>
                    <select className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600"><option>Domain</option></select>
                    <select className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600"><option>Status</option></select>
                </div>

                {/* TABLE */}
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Domain</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_USERS.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={user.image} alt="" className="w-8 h-8 rounded-full bg-slate-200" />
                                    <div>
                                        <div className="font-medium text-slate-900 text-sm">{user.name}</div>
                                        <div className="text-xs text-slate-500">{user.role}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{user.domain}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2 text-slate-400">
                                    <button className="hover:text-blue-600">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 5 8.268 7.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    </button>
                                    <button className="hover:text-amber-600">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button className="hover:text-red-600">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
