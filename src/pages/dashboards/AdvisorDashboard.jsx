import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const AdvisorDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Topbar Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", paddingBottom: "20px", borderBottom: "1px solid #e5e7eb" }}>
                <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#111827" }}>Advisor Dashboard</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ color: "#374151" }}>Welcome, <b>{user?.name}</b></span>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "500",
                            transition: "background 0.2s"
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#374151" }}>Overview</h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>

                    {/* Stat Card 1 */}
                    <div style={{ padding: "24px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ margin: "0 0 10px 0", fontSize: "0.875rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Assigned Students</h4>
                        <div style={{ fontSize: "2.25rem", fontWeight: "700", color: "#4f46e5" }}>12</div>
                    </div>

                    {/* Stat Card 2 */}
                    <div style={{ padding: "24px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ margin: "0 0 10px 0", fontSize: "0.875rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pending Reviews</h4>
                        <div style={{ fontSize: "2.25rem", fontWeight: "700", color: "#d97706" }}>5</div>
                    </div>

                    {/* Stat Card 3 */}
                    <div style={{ padding: "24px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                        <h4 style={{ margin: "0 0 10px 0", fontSize: "0.875rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Avg Performance</h4>
                        <div style={{ fontSize: "2.25rem", fontWeight: "700", color: "#10b981" }}>92%</div>
                    </div>

                </div>
            </div>

            <div style={{ marginTop: "40px" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#374151" }}>Detailed Reports</h3>
                <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px dashed #d1d5db", color: "#6b7280" }}>
                    Student list and detailed review history coming soon.
                </div>
            </div>

        </div>
    );
};

export default AdvisorDashboard;
