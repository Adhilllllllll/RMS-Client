import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAdminCounts } from "../../features/admin/adminSlice";
import Layout from "../../components/Layout";

// StatCard Component
const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
                <div className="flex items-baseline mt-2">
                    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                    {trend && (
                        <span className={`ml-3 text-xs font-medium px-2 py-0.5 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {trend > 0 ? '+' : ''}{trend}%
                        </span>
                    )}
                </div>
            </div>
            <div className={`p-4 rounded-xl ${color}`}>
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { stats, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(loadAdminCounts());
    }, [dispatch]);

    return (
        <Layout>
            <div className="space-y-8">
                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500">Overview of system performance and metrics.</p>
                </div>

                {/* VISUALIZATION / CHARTS SECTION (Placeholder for "Charts if any") */}
                {/* <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
                    <p className="text-slate-500">Charts Component Placement</p>
                </div> */}

                {/* METRICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    <StatCard
                        title="Total Advisors"
                        value={stats?.totalAdvisors || 0}
                        icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        color="bg-purple-500"
                        trend={5.2}
                    />
                    <StatCard
                        title="Total Reviewers"
                        value={stats?.totalReviewers || 0}
                        icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        color="bg-blue-500"
                        trend={2.1}
                    />
                    <StatCard
                        title="Total Students"
                        value={stats?.totalStudents || 0}
                        icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        color="bg-emerald-500"
                        trend={12.5}
                    />
                    <StatCard
                        title="Total Reviews"
                        value={128} // Mock data
                        icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        color="bg-amber-500"
                        trend={8.4}
                    />
                    <StatCard
                        title="Pending Approvals"
                        value={15} // Mock data
                        icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        color="bg-rose-500"
                        trend={-3.2}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
