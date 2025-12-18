import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyAvailability,
  addAvailability,
  removeAvailability,
} from "../../features/availability/availabilitySlice";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import AvailabilityList from "../../components/AvailabilityList";
import AvailabilityForm from "../../components/AvailabilityForm";
import Loader from "../../components/Loader";

const ReviewerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const { list, loading, error } = useSelector(
    (state) => state.availability
  );

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);


  useEffect(() => {
    if (token) {
      dispatch(fetchMyAvailability());
    }
  }, [dispatch, token]);

  const handleAdd = async (data) => {
    await dispatch(addAvailability(data));
  };

  const handleDelete = (id) => {
    dispatch(removeAvailability(id));
  };

  return (
    <div>
      <h2>Reviewer Dashboard</h2>

      <p>
        Welcome, <b>{user?.name}</b>
        <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
          Logout
        </button>
      </p>

      <h3>Add Availability</h3>
      <AvailabilityForm onSubmit={handleAdd} loading={loading} />

      <hr />

      <h3>My Availability</h3>

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <AvailabilityList data={list} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default ReviewerDashboard;
