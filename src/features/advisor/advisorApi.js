import api from "../../api/axios";

/*
  Advisor API layer
  -----------------
  Currently minimal.
  Add endpoints here as advisor features grow.
*/

// Example: fetch advisor profile (future)
export const getAdvisorProfile = () => {
  return api.get("/advisor/profile");
};

// Example: fetch assigned students (future)
export const getAssignedStudents = () => {
  return api.get("/advisor/students");
};

// Example: fetch upcoming reviews (future)
export const getAdvisorReviews = () => {
  return api.get("/advisor/reviews");
};
