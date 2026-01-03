import React, { useEffect, useState } from "react";
import api from "../../api/axios";

// ========== REUSABLE STAT CARD COMPONENT ==========
const StatCard = ({ title, value, subtitle, icon, color = "blue" }) => {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
        red: "bg-red-50 text-red-600",
        yellow: "bg-yellow-50 text-yellow-600",
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
                    {subtitle && (
                        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
                    )}
                </div>
                {icon && (
                    <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========== SIMPLE TREND CHART (SVG) ==========
const TrendChart = ({ data, height = 200 }) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-48 flex items-center justify-center text-slate-400">
                No data available
            </div>
        );
    }

    const maxValue = Math.max(...data.map(d => d.total), 1);
    const chartWidth = 100;
    const barWidth = chartWidth / data.length - 2;

    return (
        <div className="relative" style={{ height }}>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 pr-2">
                <span>{maxValue}</span>
                <span>{Math.round(maxValue / 2)}</span>
                <span>0</span>
            </div>

            {/* Chart bars */}
            <div className="ml-8 h-full flex items-end justify-around gap-1">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div className="w-full flex flex-col items-center gap-1" style={{ height: height - 30 }}>
                            {/* Total bar */}
                            <div
                                className="w-full bg-green-200 rounded-t relative group"
                                style={{
                                    height: `${(item.total / maxValue) * 100}%`,
                                    minHeight: item.total > 0 ? '4px' : '0'
                                }}
                            >
                                {/* Completed overlay */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t"
                                    style={{
                                        height: item.total > 0 ? `${(item.completed / item.total) * 100}%` : '0'
                                    }}
                                />
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    {item.completed}/{item.total} completed
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-slate-500 mt-1">{item.month}</span>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-slate-600">Completed</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-200 rounded"></div>
                    <span className="text-slate-600">Total</span>
                </div>
            </div>
        </div>
    );
};

// ========== MAIN COMPONENT ==========
const ReportsAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const res = await api.get("/advisor/analytics");
                setAnalytics(res.data.analytics);
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to load analytics");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 animate-pulse">
                            <div className="h-4 bg-slate-200 rounded w-24 mb-3"></div>
                            <div className="h-8 bg-slate-200 rounded w-16"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
                <p className="text-slate-500">Comprehensive insights from your review data</p>
            </div>

            {/* Summary Cards - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={analytics?.totalStudents || 0}
                    subtitle="Active students"
                    color="blue"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                />
                <StatCard
                    title="Avg Progress"
                    value={`${analytics?.avgStudentProgress || 0}%`}
                    subtitle="Student progress"
                    color="green"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    }
                />
                <StatCard
                    title="Reviews (Week)"
                    value={analytics?.reviewsThisWeek || 0}
                    subtitle="This week"
                    color="purple"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    }
                />
                <StatCard
                    title="Avg Score"
                    value={analytics?.avgScore || 0}
                    subtitle="Out of 100"
                    color="orange"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    }
                />
            </div>

            {/* Summary Cards - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Reviews"
                    value={analytics?.totalReviews || 0}
                    color="blue"
                />
                <StatCard
                    title="Completed"
                    value={analytics?.completedReviews || 0}
                    subtitle={`${analytics?.completionRate || 0}% rate`}
                    color="green"
                />
                <StatCard
                    title="Pending"
                    value={analytics?.pendingReviews || 0}
                    color="yellow"
                />
                <StatCard
                    title="This Month"
                    value={analytics?.reviewsThisMonth || 0}
                    color="purple"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trend Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Reviews Trend (Last 6 Months)</h3>
                    <TrendChart data={analytics?.monthlyTrend || []} height={200} />
                </div>

                {/* Status Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Reviews by Status</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Completed", value: analytics?.statusBreakdown?.completed || 0, color: "bg-green-500" },
                            { label: "Scheduled", value: analytics?.statusBreakdown?.scheduled || 0, color: "bg-blue-500" },
                            { label: "Pending", value: analytics?.statusBreakdown?.pending || 0, color: "bg-yellow-500" },
                            { label: "Cancelled", value: analytics?.statusBreakdown?.cancelled || 0, color: "bg-red-500" },
                        ].map(item => {
                            const total = analytics?.totalReviews || 1;
                            const percentage = Math.round((item.value / total) * 100) || 0;
                            return (
                                <div key={item.label}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className="font-medium text-slate-900">{item.value} ({percentage}%)</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Reviewer Performance Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Reviewer Performance</h3>
                {!analytics?.reviewerPerformance || analytics.reviewerPerformance.length === 0 ? (
                    <p className="text-slate-400 text-sm">No reviewer data available yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3">Reviewer</th>
                                    <th className="px-4 py-3">Total Reviews</th>
                                    <th className="px-4 py-3">Completed</th>
                                    <th className="px-4 py-3">Completion Rate</th>
                                    <th className="px-4 py-3">Avg Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {analytics.reviewerPerformance.map((reviewer, index) => (
                                    <tr key={reviewer._id || index} className="hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium text-slate-900">{reviewer.name}</td>
                                        <td className="px-4 py-3 text-slate-600">{reviewer.totalReviews}</td>
                                        <td className="px-4 py-3 text-slate-600">{reviewer.completedReviews}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500"
                                                        style={{ width: `${Math.round(reviewer.completionRate)}%` }}
                                                    />
                                                </div>
                                                <span className="text-slate-600">{Math.round(reviewer.completionRate)}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`font-medium ${reviewer.avgScore >= 70 ? 'text-green-600' : reviewer.avgScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {reviewer.avgScore}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportsAnalytics;
