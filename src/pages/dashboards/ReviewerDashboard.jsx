import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAvailability } from "../../features/availability/availabilitySlice";
import AvailabilityList from "../../components/AvailabilityList";
import Loader from "../../components/Loader";

const ReviewerDashboard = () => {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector(
    (state) => state.availability
  );

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchMyAvailability());
  }, [dispatch]);

  return (
    <div>
      <h2>Reviewer Dashboard</h2>

      <p>
        Welcome, <b>{user?.name}</b>
      </p>

      <h3>My Availability</h3>

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <AvailabilityList data={list} />
      )}

      <br />

      <button disabled>Add Availability (Tomorrow)</button>
    </div>
  );
};

export default ReviewerDashboard;
