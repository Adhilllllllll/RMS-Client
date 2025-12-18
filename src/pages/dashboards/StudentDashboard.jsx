import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const StudentDashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div>
            <h2>Student Dashboard</h2>

            <p>
                Welcome, <b>{user?.name}</b>
                <button
                    onClick={handleLogout}
                    style={{
                        marginLeft: "20px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "4px"
                    }}
                >
                    Logout
                </button>
            </p>

            <hr />

            <h3>Student Profile</h3>
            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>

            <hr />

            <h3>Advisor Information</h3>
            <p>Not assigned yet</p>

            <hr />

            <h3>Reviews</h3>
            <p>Coming soon...</p>

            <h3>Feedback</h3>
            <p>Coming soon...</p>
        </div>
    );
};

export default StudentDashboard;
