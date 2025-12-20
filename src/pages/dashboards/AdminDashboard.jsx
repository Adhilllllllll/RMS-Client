import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAdminCounts } from "../../features/admin/adminSlice";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const { counts, loading, error } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(loadAdminCounts());
  }, [dispatch]);

  return (
    <div>
      <h2>
        Admin Dashboard
        <button
          onClick={handleLogout}
          style={{ float: "right", fontSize: "14px" }}
        >
          Logout
        </button>
      </h2>

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {counts && (
        <div style={{ display: "flex", gap: "16px" }}>
          <div>
            <b>Students:</b> {counts.students}
          </div>
          <div>
            <b>Reviewers:</b> {counts.reviewers}
          </div>
          <div>
            <b>Advisors:</b> {counts.advisors}
          </div>
        </div>
      )}

      <hr />

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={() => navigate("/admin/create-user")}>
          Create User
        </button>

        <button onClick={() => navigate("/admin/create-student")}>
          Create Student
        </button>

        <button onClick={() => navigate("/admin/availability")}>
          View Availability
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
