import React from "react";
import Layout from "../../components/Layout";

const ReviewStatus = () => {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Review Status</h2>
                    <p className="text-slate-500">Monitor status of ongoing reviews</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-slate-700 mb-2">Review Tracking</h3>
                    <p className="text-slate-500">Review status tracking functionality coming soon</p>
                </div>
            </div>
        </Layout>
    );
};

export default ReviewStatus;
