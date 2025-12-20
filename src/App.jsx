import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ReviewerDashboard from "./pages/dashboards/ReviewerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import Login from "./pages/Login";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import AdvisorDashboard from "./pages/dashboards/AdvisorDashboard";
import { useSelector } from "react-redux";
 import AdminCreateUser from "./pages/admin/AdminCreateUser";
import AdminCreateStudent from "./pages/admin/AdminCreateStudent";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* ROOT ROUTE */}
        <Route
          path="/"
          element={
            isAuthenticated && user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : user.role === "reviewer" ? (
                <Navigate to="/reviewer/dashboard" replace />
              ) : user.role === "student" ? (
                <Navigate to="/student/dashboard" replace />
              ) : user.role === "advisor" ? (
                <Navigate to="/advisor/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/create-user"
  element={
    <ProtectedRoute role="admin">
      <AdminCreateUser />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/create-student"
  element={
    <ProtectedRoute role="admin">
      <AdminCreateStudent />
    </ProtectedRoute>
  }
/>

        {/* REVIEWER */}
        <Route
          path="/reviewer/dashboard"
          element={
            <ProtectedRoute role="reviewer">
              <ReviewerDashboard />
            </ProtectedRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADVISOR */}
        <Route
          path="/advisor/dashboard"
          element={
            <ProtectedRoute role="advisor">
              <AdvisorDashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
