import ProtectedRoute from "./components/ProtectedRoute";
import ReviewerDashboard from "./pages/dashboards/ReviewerDashboard";

<Route
  path="/reviewer/dashboard"
  element={
    <ProtectedRoute role="reviewer">
      <ReviewerDashboard />
    </ProtectedRoute>
  }
/>
