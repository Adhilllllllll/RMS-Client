import React from "react";
import Layout from "../../components/Layout";

const Settings = () => {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
                    <p className="text-slate-500">Manage system configurations</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">General Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">System Name</span>
                                <input type="text" className="border border-slate-300 rounded px-2 py-1 text-sm" defaultValue="Project Review" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">Academic Year</span>
                                <select className="border border-slate-300 rounded px-2 py-1 text-sm bg-white">
                                    <option>2024-2025</option>
                                    <option>2025-2026</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Notifications</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                                <span className="text-slate-600 text-sm">Email notifications for new reviews</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                                <span className="text-slate-600 text-sm">Weekly report summaries</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
